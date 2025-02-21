import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorageService } from '@system/async-local-storage';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DatabaseService {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        public readonly prisma: PrismaService,
        private readonly asyncLocalStorageService: AsyncLocalStorageService,
    ) {}

    setTransaction(transaction: Prisma.TransactionClient): void {
        const localStore = this.asyncLocalStorageService.getLocalStore();
        if (!localStore) {
            throw new Error('Local store is not available, the function is not called within a async storage hook.');
        }
        localStore['__database_transaction__'] = transaction;
    }

    get tx(): Prisma.TransactionClient {
        const localStore = this.asyncLocalStorageService.getLocalStore();
        if (!localStore) {
            throw new Error('Local store is not available, the function is not called within a async storage hook.');
        }
        const transaction = localStore['__database_transaction__'] as Prisma.TransactionClient;
        if (!transaction) {
            throw new Error('Transaction is not available, the function is not called within a transaction scope.');
        }
        return transaction;
    }
}
