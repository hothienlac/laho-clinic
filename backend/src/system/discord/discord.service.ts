import { Injectable, Logger } from '@nestjs/common';
import { BackgroundJob } from '@system/bullmq';
import { DatabaseService } from '@system/database';
import { HttpService } from '@system/http';

@Injectable()
export class DiscordService {
    private readonly logger = new Logger(DiscordService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly httpService: HttpService,
    ) {}

    async sendMessage(): Promise<void> {}

    @BackgroundJob()
    async flushPendingMessages(): Promise<void> {
        this.logger.log('Flushing pending messages');
    }
}
