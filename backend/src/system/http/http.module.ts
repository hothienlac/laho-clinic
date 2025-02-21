import { DynamicModule, Module } from '@nestjs/common';
import axios, { CreateAxiosDefaults } from 'axios';
import axiosRetry from 'axios-retry';
import { HttpService } from './http.service';
import { AXIOS_INSTANCE_INJECTION_TOKEN } from './http.const';

@Module({})
export class HttpModule {
    static register(options?: CreateAxiosDefaults): DynamicModule {
        return {
            module: HttpModule,
            providers: [
                {
                    provide: AXIOS_INSTANCE_INJECTION_TOKEN,
                    useFactory: () => {
                        const axiosClient = axios.create(options);
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        axiosRetry(axiosClient, { retries: 3 });
                        return axiosClient;
                    },
                },
                HttpService,
            ],
            exports: [HttpService],
        };
    }
}
