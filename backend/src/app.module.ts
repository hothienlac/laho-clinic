import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from '@clinic/authentication/authentication.module';
import { TenantModule } from '@clinic/tenant/tenant.module';
import { RedisModule } from './system/redis/redis.module';
import { BullmqModule } from './system/bullmq/bullmq.module';
import { LoggerModule } from './system/logger/logger.module';
import { AsyncLocalStorageModule } from './system/async-local-storage/async-local-storage.module';
import { PipeModule } from './system/pipe/pipe.module';
import { SentryModule } from './system/sentry/sentry.module';

@Module({
    imports: [
        AuthenticationModule,
        TenantModule,
        RedisModule,
        BullmqModule,
        LoggerModule,
        AsyncLocalStorageModule,
        PipeModule,
        SentryModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
