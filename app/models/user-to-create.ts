import { insertUser } from '../controller/database/sql';
import { userMapper } from '../mappers/user.mapper';
import { runAsync } from '../controller/database/utils/run-async';

import { UserBase } from './user-base';
import { ValidationError } from './app-error';
import { User } from './user';

/**
 * Throws validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof UserToCreate, message: string): never {
  throw new ValidationError(
    'Invalid user creation data',
    field,
    message,
  );
}

/** User to create. */
export class UserToCreate extends UserBase {

  /** Password. */
  public readonly password: string;

  public constructor(data: UserToCreate) {
    super(data);
    this.password = data.password;
  }

  /**
   * Validator function.
   * @param data Data.
   */
  public static validate(data: any): asserts data is UserToCreate {

    if (typeof data.password !== 'string') {
      throwError('password', 'Password is required');
    }

    if (data.password.length < 8) {
      throwError('password', 'Your password is too short (minimum 8)');
    }

    if (
      data.password.toLowerCase() === data.password ||
      data.password.toUpperCase() === data.password
    ) {
      throwError(
        'password',
        'Your password should contains one uppercase or lowercase character at least',
      );
    }

    super.validate(data);
  }

  /**
   * Creates new user in database.
   * @param userToCreate User.
   */
  public static async createUser(userToCreate: UserToCreate): Promise<void> {
    try {
      const user = userMapper.fromCreationData(userToCreate);
      await runAsync(
        insertUser,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.role,
          user.password,
          user.avatar,
        ],
      );
      const createdUser = await User.getByEmail(user.email);
      if (createdUser !== null) {
        await runAsync(`INSERT INTO statistics(user_id) VALUES (${createdUser.id})`);
      }
    } catch (err) {
      throwError('email', 'User is already exists');
    }
  }
}
