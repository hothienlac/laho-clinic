/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { Queue, Worker, Job, QueueOptions, ConnectionOptions } from 'bullmq';
import { bullmqEnvironment } from './bullmq.environment';
import { __BACKGROUND_JOB_METADATA__, BackgroundJobMetadata } from './bullmq.decorator';
import { DatabaseService } from '@system/database';
import { runInAsyncLocalStorage } from '@system/async-local-storage';

export type QueueInfo = {
    queue: Queue;
    jobNames: Set<string>;
};

@Global()
@Module({
    imports: [DiscoveryModule],
})
export class BullmqModule implements OnModuleInit {
    private readonly logger = new Logger(BullmqModule.name);

    private readonly queues = new Map<string, QueueInfo>();
    private readonly connection: ConnectionOptions = {
        host: bullmqEnvironment.BULLMQ_REDIS_HOST,
        port: bullmqEnvironment.BULLMQ_REDIS_PORT,
        db: bullmqEnvironment.BULLMQ_REDIS_DATABASE,
        password: bullmqEnvironment.BULLMQ_REDIS_PASSWORD,
        tls: bullmqEnvironment.BULLMQ_REDIS_USE_TLS ? {} : undefined,
    };
    private readonly queueOptions: QueueOptions = {
        connection: this.connection,
    };

    constructor(
        private readonly reflector: Reflector,
        private readonly metadataScanner: MetadataScanner,
        private readonly discoveryService: DiscoveryService,
        private readonly databaseService: DatabaseService,
    ) {}

    onModuleInit(): void {
        this.registerWorkers();
    }

    private registerWorkers(): void {
        const providers = this.discoveryService.getProviders();
        for (const provider of providers) {
            const instance = provider.instance as object;
            if (!instance) {
                continue;
            }
            const prototype = Object.getPrototypeOf(instance) as object;
            const methodNames = this.metadataScanner.getAllMethodNames(prototype);
            for (const methodName of methodNames) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const method = prototype[methodName] as Function;
                const metadata = this.reflector.get<BackgroundJobMetadata>(__BACKGROUND_JOB_METADATA__, method);
                if (!metadata) {
                    continue;
                }
                this.registerWorker(instance, methodName, metadata);
            }
        }
    }

    private registerWorker(instance: object, methodName: string, metadata: BackgroundJobMetadata): void {
        const queueName = metadata.queueName ?? instance.constructor.name;
        const jobName = metadata.jobName ?? methodName;

        let queue: Queue;
        if (this.queues.has(queueName)) {
            queue = this.queues.get(queueName)!.queue;
        } else {
            queue = new Queue(queueName, this.queueOptions);
            this.queues.set(queueName, { queue, jobNames: new Set() });
        }
        // Check if the jobName is already registered
        const jobNames = this.queues.get(queueName)!.jobNames;
        if (jobNames.has(jobName)) {
            throw new Error(`Job ${jobName} is already registered in queue ${queueName}.`);
        } else {
            jobNames.add(jobName);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const originalMethod = instance[methodName].bind(instance);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        instance[methodName] = async (...args: any[]) => {
            await queue.add(jobName, { args }, metadata.jobsOptions);
        };
        new Worker(
            queueName,
            async (job: Job) => {
                await runInAsyncLocalStorage({}, async () => {
                    const prisma = this.databaseService.prisma;
                    await prisma.$transaction(async (prismaTransaction) => {
                        try {
                            this.databaseService.setTransaction(prismaTransaction);
                        } catch (error) {
                            this.logger.error(error);
                            this.logger.error('Error setting transaction');
                        }
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                            await originalMethod(...job.data.args);
                        } catch (error) {
                            this.logger.error(error);
                            this.logger.error('Error executing the job');
                        }
                    });
                });
            },
            {
                connection: this.connection,
                ...metadata.workerOptions,
            },
        );
    }
}
