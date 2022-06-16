import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/enum/user.enum';

export const ROLES_KEY = process.env.ROLES_KEY;
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);