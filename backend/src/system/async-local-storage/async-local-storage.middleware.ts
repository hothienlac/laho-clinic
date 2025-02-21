import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { asyncLocalStorage } from './async-local-storage';

@Injectable()
export class AsyncLocalStorageMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction): void {
        asyncLocalStorage.run(
            {
                request,
            },
            () => next(),
        );
    }
}
