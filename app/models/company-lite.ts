import { Address } from './address';
import { CompanyBase } from './company-base';

/** Company lite. */
export class CompanyLite extends CompanyBase {

  /** Address. */
  public readonly address: Address;

  public constructor(data: CompanyLite) {
    super(data);
    this.address = data.address;
  }
}
