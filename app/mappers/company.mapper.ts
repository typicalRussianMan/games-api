import { AddressDb } from '../database-models/address.db';
import { CompanyDb } from '../database-models/company.db';
import { CompanyLite } from '../models/company-lite';

import { addressMapper } from './address.mapper';

import { IMapperToModel } from './mapper';

/** Company mapper. */
class CompanyMapper implements
IMapperToModel<CompanyLite, CompanyDb> {

  /** @inheritdoc */
  public toModel(data: CompanyDb): CompanyLite {
    const address = typeof data.address === 'string' ?
      JSON.parse(data.address) as AddressDb :
      data.address;

    return new CompanyLite({
      address: addressMapper.toModel(address),
      id: data.id,
      name: data.name,
      logoUrl: data.logo_url,
    });
  }
}

/** Company mapper instance. */
export const companyMapper = new CompanyMapper();
