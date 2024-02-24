/** SQL script to insert new user. */
export const insertUser = `
INSERT INTO users
(first_name, last_name, email, role, password)
VALUES
(?, ?, ?, ?, ?);
`;

/** SQL script to insert new game category. */
export const insertGameCategory = `
INSERT INTO game_categories (name)
VALUES (?);
`;

/** SQL script to insert new company. */
export const insertCompany = `
INSERT INTO companies (name, user_id)
VALUES (?, ?);
`;

/** SQL script to insert new company. */
export const insertGame = `
INSERT INTO games (name, company_id, category_id)
VALUES (?, ?, ?)
`;

/** SQL script to insert new address. */
export const insertAddress = `
INSERT INTO company_address (lat, lng, title, company_id)
VALUES (?, ?, ?, ?)
`;

/** SQL script to select full company. */
export const selectCompaniesFull = `
SELECT
  c.id,
  c.name,
  json_group_array(json_object(
    'lat', a.lat,
    'lng', a.lng,
    'title', a.title
  )) as addresses
from companies c
join company_address a on a.company_id = c.id
group by c.id;
`;

/** SQL script to select games. */
export const selectGames = `
SELECT
  g.name,
  g.id,
  g.play_count,
  g.category,
  json_object(
    'id', c.id,
    'name', c.name,
    'address', c.address
  ) as company
FROM view_games g
LEFT JOIN view_companies c ON g.company_id = c.id
`;

/** SQL script to select games count. */
export const selectGamesCount = `
SELECT COUNT(*) as count
FROM games
`;
