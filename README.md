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

### [GET] /api/user

Returns a user by token in Authorization header.

| Accepts    | Returns   |
| :--------: | :-------: |
| - | [UserDto](#userdto) |

### [GET] /api/games/categories

Returns list of the game categories.

| Accepts    | Returns   |
| :--------: | :-------: |
| - | [GameCategoryDto[]](#gamecategorydto) |

### [GET] /api/games

Returns paged list of the games.

It accepts query param map like:

```ts
`/api/games?left=${number}&right=${number}&top==${number}&bottom==${number}&limit=${number}&offset=${number}`
```

| Accepts    | Returns   |
| :--------: | :-------: |
| Query Params | [PagedListDto](#pagedlistdto)<[GameDto](#gamedto)> |

## Models

### LoginDto

```ts
interface LoginDto {

  /** Email. */
  email: string;

  /** Password. */
  password: string;
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

### ServerResponseCodeDto

```ts
/** Statuses for server responses */
enum ServerResponseCodeDto {

  /** Positive response. */
  OK = 200,

  /** Invalid request body. */
  BadRequest = 400,

  /** Attempting to access the resource without authorization. */
  Unauthorized = 401,

  /** Blocking user access to the resource. */
  Forbidden = 403,

  /** Resource not found. */
  NotFound = 404,

  /** Internal server error. */
  InternalError = 500,
}
```

### UserDto

```ts
interface UserDto {

  /** ID. */
  readonly id: number;

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

### GameCategoryDto

```ts
interface GameCategoryDto {

  /** ID. */
  readonly id: number;

  /** Name. */
  readonly name: string;
}
```

### AddressDto

```ts
export interface AddressDto {

  /** Latitude. */
  readonly lat: number;

  /** Longitude. */
  readonly lng: number;

  /** Human-readable address. */
  readonly title: string;
}
```

### CompanyLiteDto

```ts
interface CompanyLiteDto {

  /** ID. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Address. */
  readonly address: AddressDto;
}
```

It depends on:

- [AddressDto](#addressdto)

### GameDto

```ts
interface GameDto {

  /** ID. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Company. */
  readonly company: CompanyLiteDto;

  /** Category. */
  readonly category: GameCategoryDto;

  /** Play count. */
  readonly playCount: number;
}
```

It depends on:

- [GameCategoryDto](#gamecategorydto)
- [CompanyLiteDto](#companylitedto)

### PagedListDto

```ts
interface PagedListDto<T> {

  /** Offset. */
  readonly offset: number;

  /** Limit. */
  readonly limit: number;

  /** Total items count. */
  readonly totalCount: number;

  /** Items. */
  readonly items: T[];
}
```

## Error models

### ValidationErrorDto

```ts
interface ValidationErrorDto {

  /** Server response code. */
  readonly code: ServerResponseCode;

  /** General information about the error. */
  readonly message: string;

  /** Detailed information about the error. */
  readonly details: {

    /** Key - field containing the error, value - description of the error. */
    readonly [fieldName: string]: string;
  }
}
```

It depends on:

- [ServerResponseCodeDto](#serverresponsecodedto)
