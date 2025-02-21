import { Global, Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { HttpModule } from '@system/http';
import { DiscordController } from './discord.controller';

@Global()
@Module({
    imports: [HttpModule.register()],
    providers: [DiscordService],
    controllers: [DiscordController],
})
export class DiscordModule {}
