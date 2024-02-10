import { database } from '../controller/database.controller';
import { insertUser } from '../controller/database/sql';
import { UserBase } from './user-base';
import { UserMapper } from '../mappers/user.mapper';

/** User to create. */
export class UserToCreate extends UserBase {

  /** Password. */
  public readonly password: string;

  public constructor(data: UserToCreate) {
    super(data);
    this.password = data.password;
  }

  /** Validator function. */
  public static validate(data: object): asserts data is UserToCreate {
    super.validate(data)
  }

  /**
   * Creates new user in database.
   * @param db Database instance.
   * @param userToCreate User.
   */
  public static createUser(userToCreate: UserToCreate): void {
    const user = UserMapper.toCreationData(userToCreate);
    database.run(
      insertUser,
      [
        user.first_name,
        user.last_name,
        user.nick_name,
        user.email,
        user.role,
        user.password,
      ],
    );
  }
}