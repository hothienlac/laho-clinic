import { AsyncLocalStorage } from 'async_hooks';
import { LocalStore } from './async-local-storage.type';

export const asyncLocalStorage = new AsyncLocalStorage<LocalStore>();
