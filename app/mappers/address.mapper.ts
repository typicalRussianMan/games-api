import { AddressDb } from '../database-models/address.db';
import { Address } from '../models/address';

import { IMapperToModel } from './mapper';

/** Address mapper. */
class AddressMapper implements IMapperToModel<AddressDb, Address> {

  /** @inheritdoc */
  public toModel(data: AddressDb): Address {
    return new Address({
      lat: data.lat,
      lng: data.lng,
      title: data.title,
    });
  }
}

/** Address mapper instance. */
export const addressMapper = new AddressMapper();
