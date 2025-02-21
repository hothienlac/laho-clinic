import { parseEnvironment } from '@system/environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bullmq Environment');

export const bullmqEnvironmentSchema = z.object({
    BULLMQ_REDIS_HOST: z.string().default('localhost'),
    BULLMQ_REDIS_PORT: z.coerce.number().default(6379),
    BULLMQ_REDIS_DATABASE: z.coerce.number().default(0),
    BULLMQ_REDIS_PASSWORD: z.string().optional(),
    BULLMQ_REDIS_USE_TLS: z.coerce.boolean().default(false),
});

export const bullmqEnvironment = parseEnvironment(bullmqEnvironmentSchema);

logger.warn(`Environment Variables: ${JSON.stringify(bullmqEnvironment, null, 4)}`);
