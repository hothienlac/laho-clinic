import { parseEnvironment } from '@system/environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Authentication Environment');

export const authenticationEnvironmentSchema = z.object({
    BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
    JWT_SECRET: z.string().default('JWT_SECRET'),
    JWT_EXPIRES_IN: z.string().default('1h'),
    JWT_REFRESH_SECRET: z.string().default('JWT_REFRESH_SECRET'),
    JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
});

export const authenticationEnvironment = parseEnvironment(authenticationEnvironmentSchema);

logger.warn(`Environment Variables: ${JSON.stringify(authenticationEnvironment, null, 4)}`);
