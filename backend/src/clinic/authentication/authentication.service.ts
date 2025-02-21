import { UserService } from '@clinic/user';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authenticationEnvironment } from './authentication.environment';
import { RegisterUserRequest } from './authentication.request';

@Injectable()
export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);

    constructor(private readonly userService: UserService) {}

    async registerUser(request: RegisterUserRequest): Promise<void> {
        const passwordHash = await bcrypt.hash(request.password, authenticationEnvironment.BCRYPT_SALT_ROUNDS);
        await this.userService.createUser({
            email: request.email,
            fullname: request.fullname,
            nickname: request.nickname,
            password_hash: passwordHash,
            phone_number: request.phoneNumber,
        });
    }
}
