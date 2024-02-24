import { insertCompany } from '../controller/database/sql';
import { runAsync } from '../controller/database/utils/run-async';

import { Address } from './address';
import { ValidationError } from './app-error';
import { CompanyBase } from './company-base';
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

/** Company lite. */
export class Company extends CompanyBase {

  /** Address. */
  public readonly addresses: readonly Address[];

  /** Owner ID. */
  public readonly ownerId: number;

  public constructor(data: Company) {
    super(data);
    this.addresses = data.addresses;
    this.ownerId = data.ownerId;
  }

  /**
   * Validation function.
   * @param data Data.
   */
  public static async asyncValidate(data: Company): Promise<Company> {
    super.validate(data);

    if (typeof data.ownerId !== 'number') {
      throwError('ownerId', 'Invalid ownerId');
    }

    const user = await User.getById(data.ownerId);

    if (user === null) {
      throwError('ownerId', 'Unknown user');
    }

    if (user.role !== UserRole.CompanyOwner) {
      throwError('ownerId', 'You don\'t have permissions to this action');
    }

    data.addresses.forEach(Address.validate);

    return data;
  }

  /**
   * Adds company to database.
   * @param company Company.
   */
  public static addToDatabase(company: Company): Promise<void> {
    return runAsync(insertCompany, [company.name, company.ownerId]);
  }
}
