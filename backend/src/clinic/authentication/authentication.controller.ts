import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ParseBodyPipe } from '@system/pipe/parse-body.pipe';
import { RegisterUserRequest, registerUserRequestSchema } from './authentication.request';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('register-user')
    async registerUser(
        @Body(new ParseBodyPipe(registerUserRequestSchema)) request: RegisterUserRequest,
    ): Promise<void> {
        await this.authenticationService.registerUser(request);
    }
}
