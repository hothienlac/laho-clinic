import { Body, Controller, Logger, Post } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ParseBodyPipe } from '@system/pipe/parse-body.pipe';
import { sendDiscordMessageRequestSchema, SendDiscordMessageRequest } from './discord.request';

@Controller('system/discord')
export class DiscordController {
    private readonly logger = new Logger(DiscordController.name);

    constructor(private readonly discordService: DiscordService) {}

    @Post()
    async sendMessage(
        @Body(new ParseBodyPipe(sendDiscordMessageRequestSchema)) body: SendDiscordMessageRequest,
    ): Promise<void> {
        this.logger.log('Sending a message to Discord');
        await this.discordService.sendMessage(body.discordChannelName, body.username, body.message);
    }
}
