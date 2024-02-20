import { database } from '../controller/database.controller';
import { insertAddress } from '../controller/database/sql';

import { ValidationError } from './app-error';
import { Company } from './company';

/**
 * Throws address validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof Address, message: string): never {
  throw new ValidationError('Invalid address', field, message);
}

/** Address. */
export class Address {

  /** ID. */
  public readonly id: number;

  /** Latitude. */
  public readonly lat: number;

  /** Longitude. */
  public readonly lng: number;

  /** Title. */
  public readonly title: string;

  public constructor(data: Address) {
    this.id = data.id;
    this.lat = data.lat;
    this.lng = data.lng;
    this.title = data.title;
  }

  /**
   * Validation function for address.
   * @param data Data.
   */
  public static validate(data: Address): asserts data is Address {
    if (typeof data.lat !== 'number') {
      throwError('lat', 'Latitude is required');
    }

    if (typeof data.lng !== 'number') {
      throwError('lng', 'Longitude is required');
    }

    if (typeof data.title !== 'string') {
      throwError('title', 'Title is required');
    }

    if (data.lat < -90 || data.lat > 90) {
      throwError('lat', 'Incorrect latitude value');
    }

    if (data.lng < -180 || data.lng > 180) {
      throwError('lng', 'Incorrect longitude value');
    }
  }

  /**
   * Adds new address to database.
   * @param address Address.
   * @param companyId Company ID.
   */
  public static addToDatabase(address: Address, companyId: Company['id']): Promise<void> {
    return new Promise((res, rej) => {
      database.run(
        insertAddress,
        [address.lat, address.lng, address.title, companyId],
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
