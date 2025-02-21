import { Global, Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { HttpModule } from '@system/http';

@Global()
@Module({
    imports: [HttpModule.register()],
    providers: [DiscordService],
})
export class DiscordModule {}
