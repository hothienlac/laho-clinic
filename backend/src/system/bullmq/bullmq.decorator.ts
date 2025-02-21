import { SetMetadata } from '@nestjs/common';
import { JobsOptions, WorkerOptions } from 'bullmq';

export const __BACKGROUND_JOB_METADATA__ = '__background_job_metadata__';

export interface BackgroundJobMetadata {
    // Default is the service class name
    queueName?: string;
    // Default is the method name
    jobName?: string;
    // config?:
    jobsOptions?: JobsOptions;
    workerOptions?: Omit<WorkerOptions, 'connection'>;
}

export function BackgroundJob(metadata?: BackgroundJobMetadata) {
    return SetMetadata(__BACKGROUND_JOB_METADATA__, metadata || {});
}
