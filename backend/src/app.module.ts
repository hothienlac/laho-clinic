import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from '@clinic/authentication/authentication.module';
import { RedisModule } from './system/redis/redis.module';
import { BullmqModule } from './system/bullmq/bullmq.module';
import { LoggerModule } from './system/logger/logger.module';
import { AsyncLocalStorageModule } from './system/async-local-storage/async-local-storage.module';
import { PipeModule } from './system/pipe/pipe.module';
import { SentryModule } from './system/sentry/sentry.module';
import { DiscordModule } from './system/discord/discord.module';
import { HttpModule } from './system/http/http.module';
import { UserModule } from './clinic/user/user.module';
import { DatabaseModule } from '@system/database';
import { ClinicModule } from './clinic/clinic/clinic.module';
import { MedicalModule } from './clinic/medical/medical.module';

@Module({
    imports: [
        AuthenticationModule,
        RedisModule,
        BullmqModule,
        LoggerModule,
        AsyncLocalStorageModule,
        DatabaseModule,
        PipeModule,
        SentryModule,
        DiscordModule,
        HttpModule,
        UserModule,
        ClinicModule,
        MedicalModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
