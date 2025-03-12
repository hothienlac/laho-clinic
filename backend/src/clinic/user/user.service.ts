import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@system/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly databaseService: DatabaseService) {}
}
