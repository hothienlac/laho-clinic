import { parseEnvironment } from '@system/environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Redis Environment');

export const redisEnvironmentSchema = z.object({
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_USE_TLS: z.coerce.boolean().default(false),
    REDIS_DATABASE: z.coerce.number().default(0),
    REDIS_KEY_PREFIX: z.string().optional(),
    REDIS_CONNECT_TIMEOUT: z.coerce.number().default(10000),
    REDIS_LAZY_CONNECT: z.coerce.boolean().default(true),
    REDIS_KEEP_ALIVE: z.coerce.number().default(10000),
});

export const redisEnvironment = parseEnvironment(redisEnvironmentSchema);

logger.warn(`Environment Variables: ${JSON.stringify(redisEnvironment, null, 4)}`);
