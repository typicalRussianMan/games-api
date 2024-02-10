import { UserRoleDb } from "../database-models/user-role.db";
import { UserRole } from "../models/user-role";
import { reverseDictionary } from "../utils/reverse-dictionary";

export namespace UserRoleMapper {

  const DB_TO_INTERNAL: Record<UserRoleDb, UserRole> = {
    "0": UserRole.Common,
    "1": UserRole.CompanyOwner,
  };

  const INTERNAL_TO_DB = reverseDictionary(DB_TO_INTERNAL);

  export function toModel(data: UserRoleDb): UserRole {
    return DB_TO_INTERNAL[data];
  }

  export function fromModel(data: UserRole): UserRoleDb {
    return INTERNAL_TO_DB[data];
  }
}