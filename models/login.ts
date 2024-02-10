import { database } from "../controller/database.controller";

/** Login data. */
export class Login {

  /** Email. */
  public readonly email: string;

  /** Password. */
  public readonly password: string;

  public constructor(data: Login) {
    this.email = data.email;
    this.password = data.password;
  }

  /** Validator function. */
  public static validate(data: any): asserts data is Login {

  }

  /**
   * Checks if login data is correct.
   * @param data Login data.
   */
  public static checkValidation(data: Login): Promise<boolean> {
    return new Promise((res, rej) => {
      database.all(
        `SELECT * from users
        WHERE email='${data.email}' and password='${data.password}'
        LIMIT 1`,
        (err, rows) => {
          if (err) {
            rej(err);
            return;
          }

          res(rows[0] !== undefined);
        }
      );
    })
  }
}