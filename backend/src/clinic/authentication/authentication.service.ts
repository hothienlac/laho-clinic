import { UserService } from '@clinic/user';
import { Injectable, Logger } from '@nestjs/common';
import { authenticationEnvironment } from './authentication.environment';
import {  } from './authentication.request';

@Injectable()
export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);

    constructor(private readonly userService: UserService) {}
}
