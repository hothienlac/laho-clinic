import { Injectable, InternalServerErrorException, Logger, NestMiddleware } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from './database.service';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
    private readonly logger = new Logger(DatabaseMiddleware.name);
    private databaseService: DatabaseService;

    constructor(private readonly moduleRef: ModuleRef) {}

    async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        if (!this.databaseService) {
            this.databaseService = this.moduleRef.get(DatabaseService, { strict: false });
        }

        const prisma = this.databaseService.prisma;

        // Start a transaction
        const tx = prisma.$transaction((prismaTransaction) => {
            try {
                this.databaseService.setTransaction(prismaTransaction);
            } catch (error) {
                this.logger.error('Failed to set transaction', error);
                throw new InternalServerErrorException('Failed to set transaction');
            }
            return new Promise<void>((resolve, reject) => {
                response.on('finish', () => {
                    try {
                        resolve(); // Commit transaction
                    } catch (error) {
                        if (error instanceof Error) {
                            reject(error); // Rollback transaction if there's an error
                        } else {
                            reject(new Error('Unknown error'));
                        }
                    }
                });

                response.on('close', () => {
                    reject(new Error('Request closed unexpectedly'));
                });

                next();
            });
        });

        try {
            await tx; // Wait for transaction to complete
            this.logger.log('Transaction completed');
        } catch (error) {
            this.logger.error('Transaction failed', error);
        }
    }
}
