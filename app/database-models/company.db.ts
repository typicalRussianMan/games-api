import { AddressDb } from './address.db';

/** Company DB. */
export type CompanyDb = {

  /** ID. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Address in string format. */
  readonly address: string | AddressDb;
};
