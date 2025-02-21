import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AXIOS_INSTANCE_INJECTION_TOKEN } from './http.const';
import { AxiosInstance, AxiosResponse } from 'axios';
import { TypeOf, ZodType } from 'zod';
import { HttpRequestOptions } from './http.type';

@Injectable()
export class HttpService {
    private readonly logger = new Logger(HttpService.name);

    constructor(
        @Inject(AXIOS_INSTANCE_INJECTION_TOKEN)
        private readonly axiosInstance: AxiosInstance,
    ) {}

    private parseResponse<T extends ZodType<unknown>>(data: unknown, schema: T): TypeOf<T> {
        const parseResult = schema.safeParse(data);
        if (!parseResult.success) {
            this.logger.error(`Failed to parse response: ${parseResult.error.message}`);
            throw new InternalServerErrorException('One service is not functioning properly, please try again later');
        }
        return parseResult.data;
    }

    private async request<T extends ZodType<unknown>>(
        method: 'get' | 'post' | 'put' | 'patch' | 'delete',
        options: HttpRequestOptions,
        schema?: T,
    ): Promise<TypeOf<T>> {
        this.logger.log(`[${method.toUpperCase()}] ${options.url}`);
        let response: AxiosResponse;
        try {
            response = await this.axiosInstance.request({
                method,
                url: options.url,
                headers: options.headers,
                params: options.params,
                data: options.data,
            });
        } catch (error) {
            this.handleRequestError(error);
        }
        if (!schema) {
            return;
        }
        return this.parseResponse(response!.data, schema);
    }

    private handleRequestError(error: unknown): never {
        if (error instanceof Error) {
            this.logger.error(`Failed to make request: ${error.message}`);
        } else {
            this.logger.error('Failed to make request for some reason');
            this.logger.error(error);
        }
        throw new InternalServerErrorException('One service is not functioning properly, please try again later');
    }

    async get<T extends ZodType<unknown>>(options: HttpRequestOptions, schema?: T): Promise<TypeOf<T>> {
        return this.request('get', options, schema);
    }

    async post<T extends ZodType<unknown>>(options: HttpRequestOptions, schema?: T): Promise<TypeOf<T>> {
        return this.request('post', options, schema);
    }

    async put<T extends ZodType<unknown>>(options: HttpRequestOptions, schema?: T): Promise<TypeOf<T>> {
        return this.request('put', options, schema);
    }

    async patch<T extends ZodType<unknown>>(options: HttpRequestOptions, schema?: T): Promise<TypeOf<T>> {
        return this.request('patch', options, schema);
    }

    async delete<T extends ZodType<unknown>>(options: HttpRequestOptions, schema?: T): Promise<TypeOf<T>> {
        return this.request('delete', options, schema);
    }
}
