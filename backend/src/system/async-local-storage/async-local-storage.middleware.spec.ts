import { AsyncLocalStorageMiddleware } from './async-local-storage.middleware';

describe('AsyncLocalStorageMiddleware', () => {
    it('should be defined', () => {
        expect(new AsyncLocalStorageMiddleware()).toBeDefined();
    });
});
