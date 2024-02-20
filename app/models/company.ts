import { ValidationError } from './app-error';
import { User } from './user';
import { UserRole } from './user-role';

/**
 * Throws company validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof Company, message: string): never {
  throw new ValidationError('Invalid company information', field, message);
}

/** Company. */
export class Company {

  /** ID. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Owner ID. */
  public readonly ownerId: number;

  public constructor(data: Company) {
    this.id = data.id;
    this.name = data.name;
    this.ownerId = data.ownerId;
  }

  /**
   * Validation function.
   * @param data Data.
   */
  public static async asyncValidate(data: Company): Promise<Company> {

    if (typeof data.name !== 'string') {
      throwError('name', 'Name is required');
    }

    const user = await User.getById(data.ownerId);

    if (user === null) {
      throwError('ownerId', 'Cannot find user');
    }

    if (user.role !== UserRole.CompanyOwner) {
      throwError('ownerId', 'User isn\'t company owner');
    }

    return data;
  }
}
