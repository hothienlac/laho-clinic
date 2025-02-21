import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsyncLocalStorageService } from './async-local-storage.service';
import { AsyncLocalStorageMiddleware } from './async-local-storage.middleware';

@Global()
@Module({
    providers: [AsyncLocalStorageService],
    exports: [AsyncLocalStorageService],
})
export class AsyncLocalStorageModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AsyncLocalStorageMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
