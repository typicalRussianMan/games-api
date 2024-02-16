import { UserDb } from "../database-models/user.db";
import { User } from "../models/user";
import { UserToCreate } from "../models/user-to-create";
import { StrictOmit } from "../utils/types/strict-omit";
import { UserRoleMapper } from "./user-role.mapper";

export namespace UserMapper {

  /**
   * Maps database entity to user.
   * @param data Database entity.
   */
  export function toUser(data: UserDb): User {
    return new User({
      email: data.email,
      firstName: data.first_name,
      id: data.id,
      lastName: data.last_name,
      role: UserRoleMapper.toModel(data.role),
    });
  }

  /**
   * Maps user creation data to user.
   * @param data User creation data.
   */
  export function toCreationData(data: UserToCreate): StrictOmit<UserDb, 'id'> {
    return {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      role: UserRoleMapper.fromModel(data.role),
    };
  }
}