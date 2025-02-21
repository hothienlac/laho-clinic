import { DynamicModule, Module } from '@nestjs/common';
import axios, { CreateAxiosDefaults } from 'axios';
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
                    useValue: axios.create(options),
                },
                HttpService,
            ],
            exports: [HttpService],
        };
    }
}
