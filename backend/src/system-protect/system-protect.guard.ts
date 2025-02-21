import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SystemProtectGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // const request = context.switchToHttp().getRequest<Request>();
        // if (request.url.startsWith('/api/system/')) {
        //     throw new ForbiddenException('Access to /api/system/* is forbidden');
        // }
        return true;
    }
}
