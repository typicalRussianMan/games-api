import { ERROR } from 'sqlite3';
import { database } from '../controller/database.controller';
import { insertUser } from '../controller/database/sql';
import { UserBase } from './user-base';
import { UserMapper } from '../mappers/user.mapper';
import { AppError, ValidationError } from './app-error';
import { ServerResponseCode } from './server-response-code';

function throwError(field: keyof UserToCreate, message: string): never {
  throw new ValidationError(
    'Invalid user creation data',
    field,
    message,
  )
}

/** User to create. */
export class UserToCreate extends UserBase {

  /** Password. */
  public readonly password: string;

  public constructor(data: UserToCreate) {
    super(data);
    this.password = data.password;
  }

  /** Validator function. */
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
  public static createUser(userToCreate: UserToCreate): Promise<void> {
    return new Promise((res, rej) => {
      const user = UserMapper.toCreationData(userToCreate);
      database.run(
        insertUser,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.role,
          user.password,
        ],
        err => {
          if (err) {
            rej(new ValidationError(
              'Invalid registration data',
              'email',
              'User is already exists',
            ));
            return;
          }

          res();
        }
      );
    });
  }
}