const INIT_TABLE_USERS = `
CREATE TABLE users (
  id integer primary key autoincrement,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  role int not null,
  password text not null,
  avatar text not null
);
`;

const INIT_TABLE_GAME_CATEGORIES = `
CREATE TABLE game_categories (
  id integer primary key autoincrement,
  name text not null
);
`;

const INIT_TABLE_COMPANIES = `
CREATE TABLE companies (
  id integer primary key autoincrement,
  name text not null,
  logo_url text not null,
  user_id integer not null,
  foreign key(user_id) references users(id)
);
`;

const INIT_COMPANY_ADDRESS = `
CREATE TABLE company_address (
  id integer primary key autoincrement,
  lat float not null,
  lng float not null,
  title text not null,
  company_id integer not null,
  foreign key(company_id) references companies(id)
)
`;

const INIT_TABLE_GAMES = `
CREATE TABLE games (
  id integer primary key autoincrement,
  name text not null,
  play_count int default 0 not null,
  preview_url text not null,
  poster_url text not null,
  company_id integer not null,
  category_id integer not null,
  foreign key(company_id) references companies(id),
  foreign key(category_id) references game_categories(id)
);
`;

const INIT_TABLE_ACHIEVEMENTS = `
CREATE TABLE achievements (
  id integer primary key autoincrement,
  title text not null,
  description text not null
);
`;

const INIT_TABLE_USER_ACHIEVEMENT = `
CREATE TABLE user_achievement (
  id integer primary key autoincrement,
  achievement_id integer,
  user_id integer,
  foreign key(achievement_id) references achievements(id),
  foreign key(user_id) references users(id)
)
`;

const INIT_TABLE_STATISTICS = `
CREATE TABLE statistics (
  user_id integer primary key,
  games_played integer default 0 not null
);
`;

/** Database tables. */
export const TABLES = [
  INIT_TABLE_USERS,
  INIT_TABLE_GAME_CATEGORIES,
  INIT_TABLE_COMPANIES,
  INIT_COMPANY_ADDRESS,
  INIT_TABLE_GAMES,
  INIT_TABLE_ACHIEVEMENTS,
  INIT_TABLE_USER_ACHIEVEMENT,
  INIT_TABLE_STATISTICS,
] as const;
