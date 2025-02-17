import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Returns a hello world message' })
    hello() {
        return {
            message: 'Hello World!',
        };
    }
}
