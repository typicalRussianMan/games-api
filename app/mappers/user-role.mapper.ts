import { UserRoleDb } from '../database-models/user-role.db';
import { UserRole } from '../models/user-role';
import { reverseDictionary } from '../utils/reverse-dictionary';

import { IMapper } from './mapper';

/** User role mapper. */
class UserRoleMapper implements IMapper<UserRole, UserRoleDb> {

  private readonly DB_TO_INTERNAL: Record<UserRoleDb, UserRole> = {
    0: UserRole.Common,
    1: UserRole.CompanyOwner,
  };

  private readonly INTERNAL_TO_DB = reverseDictionary(this.DB_TO_INTERNAL);

  /** @inheritdoc */
  public toModel(data: UserRoleDb): UserRole {
    return this.DB_TO_INTERNAL[data];
  }

  /** @inheritdoc */
  public fromModel(data: UserRole): UserRoleDb {
    return this.INTERNAL_TO_DB[data];
  }
}

/** User role mapper instance. */
export const userRoleMapper = new UserRoleMapper();
