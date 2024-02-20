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
INSERT INTO companies (name, company_id, category_id)
VALUES (?, ?, ?)
`;

/** SQL script to insert new address. */
export const insertAddress = `
INSERT INTO company_address (lat, lng, title, company_id)
VALUES (?, ?, ?, ?)
`;
