import { database } from '../controller/database.controller';
import { insertCompany } from '../controller/database/sql';

import { Address } from './address';
import { Company } from './company';

/** Company lite. */
export class CompanyFull extends Company {

  /** Address. */
  public readonly addresses: readonly Address[];

  public constructor(data: CompanyFull) {
    super(data);
    this.addresses = data.addresses;
  }

  /**
   * Validation function.
   * @param data Data.
   */
  public static async asyncValidate(data: CompanyFull): Promise<CompanyFull> {
    await super.asyncValidate(data);

    data.addresses.forEach(Address.validate);

    return data;
  }

  /**
   * Adds company to database.
   * @param company Company.
   */
  public static addToDatabase(company: Company): Promise<void> {
    return new Promise((res, rej) => {
      database.run(
        insertCompany,
        [company.name, company.ownerId],
        (err: Error | null) => {
          if (err) {
            rej(err);
          }

          res(undefined);
        },
      );
    });
  }
}
