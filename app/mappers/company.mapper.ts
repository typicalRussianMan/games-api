import { AddressDb } from '../database-models/address.db';
import { CompanyDb } from '../database-models/company.db';
import { CompanyLite } from '../models/company-lite';

import { addressMapper } from './address.mapper';

import { IMapperToModel } from './mapper';

/** Company mapper. */
class CompanyMapper implements
IMapperToModel<CompanyDb, CompanyLite> {

  /** @inheritdoc */
  public toModel(data: CompanyDb): CompanyLite {
    const address = typeof data.address === 'string' ?
      JSON.parse(data.address) as AddressDb :
      data.address;

    return new CompanyLite({
      address: addressMapper.toModel(address),
      id: data.id,
      name: data.name,
    });
  }
}

/** Company mapper instance. */
export const companyMapper = new CompanyMapper();
