"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const constants_1 = require("./constants");
class ApiError extends Error {
    constructor(message, statusCode, errorCode = constants_1.ResponseErrorCodes.NORMAL) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.success = !(`${statusCode}`.startsWith("4") || !`${statusCode}`.startsWith("5"));
    }
}
exports.ApiError = ApiError;
