# Games app API

This is the Express API for Games app.

The app in this repo is deployed at [https://games-app-pdmt.onrender.com/](https://games-app-pdmt.onrender.com/).

## Endpoints

### [POST] /api/auth/login

Authorize user by email and password.

| Accepts    | Returns   |
| :--------: | :-------: |
| [LoginDto](#logindto) | [TokenDto](#tokendto) |

### [POST] /api/auth/register

Creates a new user.

| Accepts    | Returns   |
| :--------: | :-------: |
| [UserToCreateDto](#usertocreatedto) | [TokenDto](#tokendto) |

## Models

### LoginDto

```ts
interface LoginDto {

  /** Email. */
  email: string;

  /** Password. */
  password: number;
}
```

### TokenDto

```ts
interface TokenDto {

  /** Token. */
  token: string;
}
```

### UserToCreateDto

```ts
interface UserToCreateDto {

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Nick name. */
  readonly nickName: string;

  /** Email. */
  readonly email: string;

  /** Role. */
  readonly role: UserRole;

  /** Password. */
  readonly password: string;
}
```

It depends on:

- [UserRoleDto](#userroledto)

### UserRoleDto

```ts
enum UserRoleDto {

  /** Common user role. */
  Common = 'Common',

  /** 
   * Company owner. 
   * These users can manage their company and publish games. 
   */
  CompanyOwner = 'CompanyOwner',
} 
```
