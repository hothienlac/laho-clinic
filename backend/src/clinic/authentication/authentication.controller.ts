import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ParseBodyPipe } from '@system/pipe/parse-body.pipe';
import {  } from './authentication.request';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

}
