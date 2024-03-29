/** SQL script to insert new user. */
export const insertUser = `
INSERT INTO users
(first_name, last_name, email, role, password, avatar)
VALUES
(?, ?, ?, ?, ?, ?);
`;

/** SQL script to insert new game category. */
export const insertGameCategory = `
INSERT INTO game_categories (name)
VALUES (?);
`;

/** SQL script to insert new company. */
export const insertCompany = `
INSERT INTO companies (name, user_id, logo_url)
VALUES (?, ?, ?);
`;

/** SQL script to insert new company. */
export const insertGame = `
INSERT INTO games (name, company_id, category_id, preview_url, poster_url)
VALUES (?, ?, ?, ?, ?)
`;

/** SQL script to insert new address. */
export const insertAddress = `
INSERT INTO company_address (lat, lng, title, company_id)
VALUES (?, ?, ?, ?)
`;

/** SQL script to insert achievement. */
export const insertAchievement = `
INSERT INTO achievements (title, description)
VALUES (?, ?)
`;

/** SQL script to insert user achievement. */
export const insertUserAchievement = `
INSERT INTO user_achievement (achievement_id, user_id)
VALUES (?, ?)
`;

/** SQL script to select full company. */
export const selectCompaniesFull = `
SELECT
  c.id,
  c.name,
  c.logo_url,
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
  g.preview_url,
  g.poster_url,
  json_object(
    'id', c.id,
    'name', c.name,
    'address', c.address,
    'logo_url', c.logo_url
  ) as company
FROM view_games g
LEFT JOIN view_companies c ON g.company_id = c.id
`;

/** SQL script to select games count. */
export const selectGamesCount = `
SELECT COUNT(*) as count
FROM games
`;

/** SQL script to select user profile. */
export const selectProfile = `
SELECT
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  u.role,
  u.avatar,
  a.title,
  json_group_array(
    json_object(
      'id', a.id,
      'title', a.title,
      'description', a.description,
      'is_collected', CASE WHEN
        EXISTS (SELECT 1 FROM user_achievement
          WHERE user_id=u.id AND achievement_id=a.id
        )
          THEN 1
          ELSE 0
      END
    )
  ) as achievements
FROM users u
JOIN achievements a
WHERE u.id=?
`;
