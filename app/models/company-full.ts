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
}
