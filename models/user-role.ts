/** User role. */
export enum UserRole {
  Common = 'Common',
  CompanyOwner = 'CompanyOwner',
}

/**
 * Checks if value is user role.
 * @param value Value.
 */
export function isRole(value: unknown): value is UserRole {
  return value === UserRole.Common || value === UserRole.CompanyOwner;
}
