import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@system/database/database.service';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly databaseService: DatabaseService) {}

    async createUser(data: Prisma.userCreateInput): Promise<user> {
        const createdUser = await this.databaseService.tx.user.create({
            data,
        });
        return createdUser;
    }
}
