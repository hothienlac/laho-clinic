import { SetMetadata } from '@nestjs/common';
import { __NO_DATABASE_METADATA__ } from './database.const';

export const NoDatabase = () => SetMetadata(__NO_DATABASE_METADATA__, true);
