import { UserToCreate } from '../../../models/user-to-create';
import { UserRole } from '../../../models/user-role';

const USERS: UserToCreate[] = [
  new UserToCreate({
    email: 'qwe@qwe.qwe',
    firstName: 'Andrey',
    lastName: 'Skripachev',
    password: 'qwe123qwe',
    role: UserRole.Common,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
  new UserToCreate({
    email: 'Karim@qwe.qwe',
    firstName: 'Karim',
    lastName: 'Kashapov',
    password: 'qwe123qwe',
    role: UserRole.Common,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
  new UserToCreate({
    email: 'Kwaka@qwe.qwe',
    firstName: 'Quake',
    lastName: 'Kwakovich',
    password: 'qwe123qwe',
    role: UserRole.Common,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
  new UserToCreate({
    email: 'Nikitka@qwe.qwe',
    firstName: 'Nik',
    lastName: 'Nikov',
    password: 'qwe123qwe',
    role: UserRole.Common,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
  new UserToCreate({
    email: 'Elena@qwe.qwe',
    firstName: 'Elena',
    lastName: 'Elenova',
    password: 'qwe123qwe',
    role: UserRole.Common,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
  new UserToCreate({
    email: 'Owner@qwe.qwe',
    firstName: 'Owner',
    lastName: 'Ownerov',
    password: 'qwe123qwe',
    role: UserRole.CompanyOwner,
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  }),
];

/**
 * Adds users to database.
 * @param db Database.
 */
export async function addUsers(): Promise<void> {
  for (const user of USERS) {

    // eslint-disable-next-line no-await-in-loop
    await UserToCreate.createUser(user);
  }
}
