import { ServerResponseCode } from './server-response-code';

/** App error. */
export class AppError extends Error {

  /** Error code. */
  public readonly code: ServerResponseCode;

  /** Detailed info about error. */
  public readonly details?: unknown;

  public constructor(errorCode: ServerResponseCode, message: string, details?: unknown) {
    super(message);
    this.code = errorCode;
    this.details = details;
  }

  /** Converts error to JSON object. */
  public toJson(): object {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

/** Validation error. */
export class ValidationError extends AppError {

  public constructor(
    message: string,
    field: string,
    error: string,
  ) {
    super(
      ServerResponseCode.BadRequest,
      message,
      {
        [field]: error,
      },
    );
  }
}

/** Authorization error. */
export class AuthorizationError extends AppError {

  public constructor(message: string) {
    super(ServerResponseCode.Unauthorized, message);
  }
}
