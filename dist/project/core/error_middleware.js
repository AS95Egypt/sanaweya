"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorMiddleware = globalErrorMiddleware;
// app
const constants_1 = require("./constants");
const api_error_1 = require("./api_error");
function globalErrorMiddleware(err, req, res, next) {
    let statusCode;
    let response = {
        success: err instanceof api_error_1.ApiError ? err.success : false,
        message: getResponseMessage(err),
        error: err,
        error_code: constants_1.ResponseErrorCodes.NORMAL,
    };
    statusCode = getResponseStatusCode(err);
    // allow client to perform custom error handling
    if (err instanceof api_error_1.ApiError &&
        err.errorCode &&
        err.errorCode != constants_1.ResponseErrorCodes.NORMAL) {
        response["error_code"] = err.errorCode;
    }
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
        response.error = err;
    }
    res.status(statusCode).json(response);
}
function getResponseMessage(err) {
    let msg = "";
    // duplicate key error
    if (err.code && err.code === 11000) {
        msg =
            Object.entries(err.keyValue)[0][0] + // field
                ": " +
                Object.entries(err.keyValue)[0][1] + // value
                " already exists";
    }
    else {
        msg = err.message;
    }
    return msg;
}
function getResponseStatusCode(err) {
    let statusCode;
    // duplicate key error
    if (err.code && err.code === 11000) {
        statusCode = constants_1.StatusCodes.BAD_REQUEST_400;
    }
    else {
        statusCode =
            err instanceof api_error_1.ApiError
                ? err.statusCode
                : constants_1.StatusCodes.INTERNAL_SERVER_ERROR_500;
    }
    return statusCode;
}
