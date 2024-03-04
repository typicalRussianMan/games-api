import { UserDb } from '../database-models/user.db';
import { User } from '../models/user';
import { UserToCreate } from '../models/user-to-create';
import { StrictOmit } from '../utils/types/strict-omit';

import { IMapperFromModel, IMapperToModel } from './mapper';
import { userRoleMapper } from './user-role.mapper';

/** User mapper. */
class UserMapper implements
IMapperToModel<User, UserDb, 'user'>,
IMapperFromModel<UserToCreate, StrictOmit<UserDb, 'id'>, 'creationData'> {

  /** @inheritdoc */
  public toUser(data: UserDb): User {
    return new User({
      email: data.email,
      firstName: data.first_name,
      id: data.id,
      lastName: data.last_name,
      role: userRoleMapper.toModel(data.role),
      avatar: data.avatar,
    });
  }

  /** @inheritdoc */
  public fromCreationData(data: UserToCreate): StrictOmit<UserDb, 'id'> {
    return {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      role: userRoleMapper.fromModel(data.role),
      avatar: data.avatar,
    };
  }
}

/** User mapper instance. */
export const userMapper = new UserMapper();
