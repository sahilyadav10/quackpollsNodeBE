import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import mongoose from "mongoose";
import AppError, { ErrorCodes, ErrorDetails } from "../utils/appError";

// Standard error response interface
interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code: string;
    status: number;
    timestamp: string;
    path: string;
    requestId?: string;
    details?: ErrorDetails;
  };
}

// Extended error interface for type checking
interface CustomError extends Error {
  statusCode?: number;
  code?: string | number;
  errors?: { message: string }[];
  isOperational?: boolean;
  details?: ErrorDetails;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let error: CustomError = { ...err };
    error.message = err.message;
    error.isOperational = err.isOperational ?? true;

    // Get request ID from headers or generate new one
    const requestId =
      req.headers["x-request-id"] || Math.random().toString(36).substring(7);

    // Log error with request details
    console.error({
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
      },
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        requestId,
      },
    });

    // Handle different types of errors
    if (err instanceof mongoose.Error.CastError) {
      error = AppError.notFound("Invalid resource identifier");
    }

    if ((err as MongoError).code === 11000) {
      const field = Object.keys((err as any).keyPattern)[0];
      error = AppError.badRequest(`Duplicate value for field: ${field}`, {
        field,
      });
    }

    if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors).map((val) => val.message);
      error = AppError.validation("Validation failed", {
        validationErrors: messages,
      });
    }

    if (err.name === "JsonWebTokenError") {
      error = AppError.unauthorized("Invalid token");
    }

    if (err.name === "TokenExpiredError") {
      error = AppError.unauthorized("Token expired");
    }

    // Handle unknown errors
    if (!error.isOperational) {
      error = new AppError("Internal server error", 500);
    }

    // Construct error response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        code: error.code?.toString() || ErrorCodes.SERVER_ERROR,
        status: error.statusCode || 500,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        requestId: requestId as string,
        details: error.details,
      },
    };

    // Send error response
    res.status(error.statusCode || 500).json(errorResponse);
  } catch (error) {
    // Handle any errors in the error middleware itself
    console.error("Error in error middleware:", error);
    res.status(500).json({
      success: false,
      error: {
        message: "Internal server error",
        code: ErrorCodes.SERVER_ERROR,
        status: 500,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }
};

export default errorMiddleware;
