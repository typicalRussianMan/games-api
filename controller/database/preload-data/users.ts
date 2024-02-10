import { Database } from 'sqlite3';

import { UserToCreate } from '../../../models/user-to-create';
import { UserRole } from '../../../models/user-role';

const USERS: UserToCreate[] = [
  new UserToCreate({
    email: 'qwe@qwe.qwe',
    firstName: 'Andrey',
    lastName: 'Skripachev',
    nickName: 'abobius',
    password: 'qwe123qwe',
    role: UserRole.Common,
  }),
  new UserToCreate({
    email: 'valeria-zolotarenko@gmail.com',
    firstName: 'Valeria',
    lastName: 'Zolotarenko',
    nickName: 'valeria_123',
    password: 'valer1a',
    role: UserRole.Common,
  }),
  new UserToCreate({
    email: 'kaftasev-dima@yandex.com',
    firstName: 'Dmitry',
    lastName: 'Kasftasev',
    nickName: 'dima_test_123',
    password: 'd1mas1k',
    role: UserRole.Common,
  }),
  new UserToCreate({
    email: 'kashapov-karim@gmail.com',
    firstName: 'Karim',
    lastName: 'Kashapov',
    nickName: 'kar1m4k',
    password: 'qweqweqwe',
    role: UserRole.Common,
  }),
  new UserToCreate({
    email: 'kraskovky-artem@gmail.com',
    firstName: 'Artem',
    lastName: 'Kraskovsky',
    nickName: 'tem444k_super',
    password: 'qweqweqwe',
    role: UserRole.Common,
  }),
];

/**
 * Adds users to database.
 * @param db Database.
 */
export function addUsers(db: Database): void {
  for (const user of USERS) {
    UserToCreate.createUser(user);
  }
}