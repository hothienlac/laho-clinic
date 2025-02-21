import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BackgroundJob } from '@system/bullmq';
import { DatabaseService } from '@system/database';
import { HttpService } from '@system/http';
import { AxiosError } from 'axios';

type DiscordMessageInfo = {
    discord_id: string;
    webhook_url: string;
    username: string;
    message: string;
};
@Injectable()
export class DiscordService {
    private readonly logger = new Logger(DiscordService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly httpService: HttpService,
    ) {}

    private async sendMessageToDiscord(discordMessage: DiscordMessageInfo): Promise<void> {
        this.logger.log(`Sending a message to Discord. [${discordMessage.username}]: ${discordMessage.message}`);
        try {
            await this.httpService.post({
                url: discordMessage.webhook_url,
                data: {
                    username: discordMessage.username,
                    content: discordMessage.message,
                },
            });
        } catch (error) {
            let error_message: string;
            if (error instanceof AxiosError) {
                this.logger.error(`Failed to send a message to Discord.`, error);
                error_message = error.response ? JSON.stringify(error.response.data) : error.message;
            } else {
                this.logger.error(`Failed to send a message to Discord.. Something went wrong.`);
                error_message = 'Something went wrong';
            }
            await this.databaseService.tx.discord.update({
                where: {
                    discord_id: discordMessage.discord_id,
                },
                data: {
                    processed_at: new Date(),
                    error_message,
                },
            });
        }
        await this.databaseService.tx.discord.update({
            where: {
                discord_id: discordMessage.discord_id,
            },
            data: {
                processed_at: new Date(),
            },
        });
    }

    async sendMessage(discordChannelName: string, username: string, message: string): Promise<void> {
        this.logger.log(`Sending a message to Discord channel [${discordChannelName}]. [${username}]: ${message}`);
        const discordChannel = await this.databaseService.tx.discord_channel.findUnique({
            where: {
                discord_channel_name: discordChannelName,
            },
        });
        if (!discordChannel) {
            throw new NotFoundException(`Discord channel [${discordChannelName}] not found`);
        }
        await this.databaseService.tx.discord.create({
            data: {
                discord_channel_id: discordChannel.discord_channel_id,
                username,
                message,
            },
        });
        await this.flushPendingMessages();
    }

    @BackgroundJob()
    async flushPendingMessages(): Promise<void> {
        this.logger.log('Flushing pending messages');
        const pendingMessages = await this.databaseService.tx.$queryRaw<DiscordMessageInfo[]>`
            SELECT "d"."discord_id", "dc"."webhook_url", "d"."username", "d"."message"
            FROM "messaging"."discord" AS "d"
            INNER JOIN "messaging"."discord_channel" AS "dc"
            ON "d"."discord_channel_id" = "dc"."discord_channel_id"
            WHERE "processed_at" IS NULL
            ORDER BY "created_at" ASC
            LIMIT 10
            FOR UPDATE SKIP LOCKED
        `;
        this.logger.log(`Found ${pendingMessages.length} pending messages`);
        for (const pendingMessage of pendingMessages) {
            await this.sendMessageToDiscord(pendingMessage);
        }
    }
}
