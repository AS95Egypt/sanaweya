// packages
import express from "express";
// app
import { StatusCodes, ResponseErrorCodes } from "./constants";
import { ApiError } from "./api_error";

interface Response {
  success: boolean;
  message: string;
  error_code?: string;
  error?: Error;
  stack?: string;
}

export function globalErrorMiddleware(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let statusCode;
  let response: Response = {
    success: err instanceof ApiError ? (err as ApiError).success : false,
    message: getResponseMessage(err),
    error: err,
    error_code: ResponseErrorCodes.NORMAL,
  };

  statusCode = getResponseStatusCode(err);
  // allow client to perform custom error handling
  if (
    err instanceof ApiError &&
    (err as ApiError).errorCode &&
    (err as ApiError).errorCode != ResponseErrorCodes.NORMAL
  ) {
    response["error_code"] = (err as ApiError).errorCode;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.error = err;
  }
  res.status(statusCode).json(response);
}

function getResponseMessage(err: Error) {
  let msg = "";
  // duplicate key error
  if ((err as any).code && (err as any).code === 11000) {
    msg =
      Object.entries((err as any).keyValue)[0][0] + // field
      ": " +
      Object.entries((err as any).keyValue)[0][1] + // value
      " already exists";
  } else {
    msg = err.message;
  }
  return msg;
}
function getResponseStatusCode(err: Error) {
  let statusCode;
  // duplicate key error
  if ((err as any).code && (err as any).code === 11000) {
    statusCode = StatusCodes.BAD_REQUEST_400;
  } else {
    statusCode =
      err instanceof ApiError
        ? (err as ApiError).statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR_500;
  }
  return statusCode;
}
