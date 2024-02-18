import { UserToCreate } from '../../../models/user-to-create';
import { UserRole } from '../../../models/user-role';

const USERS: UserToCreate[] = [
  new UserToCreate({
    email: 'qwe@qwe.qwe',
    firstName: 'Andrey',
    lastName: 'Skripachev',
    password: 'qwe123qwe',
    role: UserRole.Common,
  }),
];

/**
 * Adds users to database.
 * @param db Database.
 */
export function addUsers(): void {
  for (const user of USERS) {
    UserToCreate.createUser(user);
  }
}
