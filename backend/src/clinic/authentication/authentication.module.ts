import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '@clinic/user';
import { JwtService } from './jwt.service';

@Module({
    imports: [UserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtService],
})
export class AuthenticationModule {}
