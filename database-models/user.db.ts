import { UserRoleDb } from "./user-role.db";

export interface UserDb {

  /** ID. */
  readonly id: number;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Nick name. */
  readonly nick_name: string;

  /** Email. */
  readonly email: string;

  /** User role. */
  readonly role: UserRoleDb;

  /** Password. */
  readonly password: string;
}