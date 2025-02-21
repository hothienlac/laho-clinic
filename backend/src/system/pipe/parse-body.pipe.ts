import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TypeOf, ZodType } from 'zod';

@Injectable()
export class ParseBodyPipe<T extends ZodType<unknown>> implements PipeTransform {
    constructor(private readonly schema: T) {}

    transform(value: unknown): TypeOf<T> {
        const parseResult = this.schema.safeParse(value);
        if (!parseResult.success) {
            throw new BadRequestException(parseResult.error);
        }
        return parseResult.data;
    }
}
