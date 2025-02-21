import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from './prisma.service';
import { DatabaseMiddleware } from './database.middleware';

@Global()
@Module({
    providers: [DatabaseService, PrismaService],
    exports: [DatabaseService],
})
export class DatabaseModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DatabaseMiddleware).forRoutes('*');
    }
}
