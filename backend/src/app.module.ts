import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
    imports: [AuthenticationModule, TenantModule],
    controllers: [AppController],
})
export class AppModule {}
