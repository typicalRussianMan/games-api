const VIEW_COMPANIES = `
CREATE VIEW view_companies AS
SELECT
  c.id,
  c.name,
  json_object(
    'lat', a.lat,
    'lng', a.lng,
    'title', a.title
  ) as address
FROM companies c
JOIN company_address a ON a.company_id = c.id;
`;

const VIEW_GAMES = `
CREATE VIEW view_games AS
SELECT
  g.id,
  g.name,
  g.play_count,
  g.company_id,
  json_object('name', g_c.name, 'id', g_c.id) as category
FROM games g
JOIN game_categories g_c ON g.category_id = g_c.id;
`;

/** Views. */
export const VIEWS = [VIEW_COMPANIES, VIEW_GAMES] as const;
