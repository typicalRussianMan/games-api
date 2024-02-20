const VIEW_COMPANIES = `
CREATE VIEW view_companies AS
SELECT
  c.id AS id,
  c.name AS name,
  json_object(
    'lat', a.lat,
    'lng', a.lng,
    'title', a.title
  ) as address
FROM companies c
JOIN company_address a ON a.company_id = c.id;
`;

/** Views. */
export const VIEWS = [VIEW_COMPANIES] as const;
