import { isEmail } from '../utils/is-email';

import { ValidationError } from './app-error';
import { UserRole } from './user-role';

/**
 * Throws user validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof UserBase, message: string): never {
  throw new ValidationError(
    'Invalid user data',
    field,
    message,
  );
}

/** User base. */
export class UserBase {

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Email. */
  public readonly email: string;

  /** Role. */
  public readonly role: UserRole;

  /** Avatar URL. */
  public readonly avatar: string;

  public constructor(data: UserBase) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.avatar = data.avatar;
  }

  /**
   * Validator function.
   * @param data Data.
   */
  public static validate(data: any): asserts data is UserBase {
    if (typeof data.firstName !== 'string') {
      throwError('firstName', 'Invalid first name');
    }

    if (typeof data.lastName !== 'string') {
      throwError('lastName', 'Invalid last name');
    }

    if (!isEmail(data.email)) {
      throwError('email', 'Invalid email.');
    }
  }
}
