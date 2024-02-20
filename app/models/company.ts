import { ValidationError } from './app-error';

/**
 * Throws company validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof Company, message: string): never {
  throw new ValidationError('Invalid company information', field, message);
}

/** Company. */
export class Company {

  /** ID. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Owner ID. */
  public readonly ownerId: number;

  public constructor(data: Company) {
    this.id = data.id;
    this.name = data.name;
    this.ownerId = data.ownerId;
  }
}
