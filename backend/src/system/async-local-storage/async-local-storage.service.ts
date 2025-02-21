import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LocalStore } from './async-local-storage.type';
import { asyncLocalStorage } from './async-local-storage';

@Injectable()
export class AsyncLocalStorageService {
    getLocalStore(): LocalStore | undefined {
        const store = asyncLocalStorage.getStore();
        return store;
    }

    forceGetLocalStore(): LocalStore {
        const store = asyncLocalStorage.getStore();
        if (!store) {
            throw new InternalServerErrorException(
                'Local storage is not available, something went wrong in the system.',
            );
        }
        return store;
    }
}
