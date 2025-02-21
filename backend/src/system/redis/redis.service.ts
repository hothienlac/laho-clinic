import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisEnvironment } from './redis.environment';

@Injectable()
export class RedisService {
    client = new Redis({
        host: redisEnvironment.REDIS_HOST,
        port: redisEnvironment.REDIS_PORT,
        password: redisEnvironment.REDIS_PASSWORD,
        tls: redisEnvironment.REDIS_USE_TLS ? {} : undefined,
        db: redisEnvironment.REDIS_DATABASE,
        keyPrefix: redisEnvironment.REDIS_KEY_PREFIX,
        connectTimeout: redisEnvironment.REDIS_CONNECT_TIMEOUT,
        lazyConnect: redisEnvironment.REDIS_LAZY_CONNECT,
        keepAlive: redisEnvironment.REDIS_KEEP_ALIVE,
    });
}
