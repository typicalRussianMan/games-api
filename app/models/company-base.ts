import { ValidationError } from './app-error';

/**
 * Throws company validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof CompanyBase, message: string): never {
  throw new ValidationError('Invalid company information', field, message);
}

/** Company. */
export class CompanyBase {

  /** ID. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  public constructor(data: CompanyBase) {
    this.id = data.id;
    this.name = data.name;
  }

  /**
   * Validation function.
   * @param data Data.
   */
  public static validate(data: CompanyBase): asserts data is CompanyBase {

    if (typeof data.name !== 'string') {
      throwError('name', 'Name is required');
    }
  }
}
