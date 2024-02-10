import { UserRole } from "./user-role";

/** User base. */
export class UserBase {

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Nick name. */
  public readonly nickName: string;

  /** Email. */
  public readonly email: string;

  /** Role. */
  public readonly role: UserRole;

  public constructor(data: UserBase) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.nickName = data.nickName;
    this.role = data.role;
  }

  /** Validator function. */
  public static validate(data: any): asserts data is UserBase {

  }
}