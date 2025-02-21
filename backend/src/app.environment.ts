import { Logger } from '@nestjs/common';
import { parseEnvironment } from '@system/environment';
import { z } from 'zod';

const logger = new Logger('Environment');

export enum AppEnvironment {
    Development = 'development',
    Production = 'production',
    Staging = 'staging',
}

export const appEnvironmentSchema = z.object({
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default('http://localhost:3000'),
    NODE_ENV: z.string().default('development'),
});

export const appEnvironment = parseEnvironment(appEnvironmentSchema);

logger.warn(`Environment Variables: ${JSON.stringify(appEnvironment, null, 4)}`);
