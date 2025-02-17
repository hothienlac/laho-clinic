import { ZodObject, ZodRawShape } from 'zod';
import { Logger } from '@nestjs/common';
import { ParseEnvironmentError } from './environment.type';

const logger = new Logger('EnvironmentUtil');

export function parseEnvironment<T extends ZodRawShape>(schema: ZodObject<T>) {
    const environments = schema.safeParse(process.env);
    if (!environments.success) {
        logger.error(environments.error);
        throw new ParseEnvironmentError(`Invalid environment variables. Check logs for more details.`);
    }
    return environments.data;
}
