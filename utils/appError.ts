// Error codes enum
export enum ErrorCodes {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE_KEY = "DUPLICATE_KEY",
  CAST_ERROR = "CAST_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
}

// Error details interfaces
export interface ValidationErrorDetails {
  validationErrors: string[];
  fields?: Record<string, string>;
}

export interface DuplicateKeyErrorDetails {
  field: string;
  value?: string;
}

export interface NotFoundErrorDetails {
  resource: string;
  id?: string | number;
}

export interface UnauthorizedErrorDetails {
  reason?: string;
  requiredRole?: string;
}

export interface ForbiddenErrorDetails {
  requiredPermission?: string;
  currentRole?: string;
}

export interface BadRequestErrorDetails {
  field?: string;
  value?: any;
  reason?: string;
}

// Union type for all possible error details
export type ErrorDetails =
  | ValidationErrorDetails
  | DuplicateKeyErrorDetails
  | NotFoundErrorDetails
  | UnauthorizedErrorDetails
  | ForbiddenErrorDetails
  | BadRequestErrorDetails
  | Record<string, any>; // Fallback for other types of details

// Custom Error class for application errors
export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;
  details?: ErrorDetails;

  constructor(
    message: string,
    statusCode: number,
    code: string = ErrorCodes.SERVER_ERROR,
    details?: ErrorDetails
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.details = details;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(
    message: string = "Resource not found",
    details?: NotFoundErrorDetails
  ) {
    return new AppError(message, 404, ErrorCodes.NOT_FOUND, details);
  }

  static badRequest(message: string, details?: BadRequestErrorDetails) {
    return new AppError(message, 400, ErrorCodes.BAD_REQUEST, details);
  }

  static unauthorized(
    message: string = "Unauthorized access",
    details?: UnauthorizedErrorDetails
  ) {
    return new AppError(message, 401, ErrorCodes.UNAUTHORIZED, details);
  }

  static forbidden(
    message: string = "Forbidden access",
    details?: ForbiddenErrorDetails
  ) {
    return new AppError(message, 403, ErrorCodes.FORBIDDEN, details);
  }

  static validation(message: string, details: ValidationErrorDetails) {
    return new AppError(message, 400, ErrorCodes.VALIDATION_ERROR, details);
  }

  static duplicateKey(message: string, details: DuplicateKeyErrorDetails) {
    return new AppError(message, 409, ErrorCodes.DUPLICATE_KEY, details);
  }
}

export default AppError;
