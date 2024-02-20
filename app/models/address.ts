import { ValidationError } from './app-error';

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
}
