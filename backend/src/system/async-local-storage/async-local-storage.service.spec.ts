import { Test, TestingModule } from '@nestjs/testing';
import { AsyncLocalStorageService } from './async-local-storage.service';

describe('AsyncLocalStorageService', () => {
    let service: AsyncLocalStorageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AsyncLocalStorageService],
        }).compile();

        service = module.get<AsyncLocalStorageService>(AsyncLocalStorageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
