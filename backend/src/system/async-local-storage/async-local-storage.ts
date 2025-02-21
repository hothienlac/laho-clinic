import { AsyncLocalStorage } from 'async_hooks';
import { LocalStore } from './async-local-storage.type';

export const asyncLocalStorage = new AsyncLocalStorage<LocalStore>();

export async function runInAsyncLocalStorage(store: LocalStore, fn: () => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
        asyncLocalStorage.run(store, () => {
            fn().then(resolve).catch(reject);
        });
    });
}
