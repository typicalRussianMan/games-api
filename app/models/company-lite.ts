import { Address } from './address';
import { Company } from './company';

/** Company lite. */
export class CompanyLite extends Company {

  /** Address. */
  public readonly address: Address;

  public constructor(data: CompanyLite) {
    super(data);
    this.address = data.address;
  }
}
