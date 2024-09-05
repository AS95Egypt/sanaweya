"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// app
const database_1 = require("./project/core/database");
const student_router_1 = require("./project/routes/student_router");
const api_error_1 = require("./project/core/api_error");
const constants_1 = require("./project/core/constants");
const error_middleware_1 = require("./project/core/error_middleware");
const redis_client_1 = require("./project/core/redis_client");
// Server
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use((0, hpp_1.default)());
// Routes
app.use(student_router_1.StudentRouter);
// handle not found routes
app.all("*", (req, res, next) => {
    next(new api_error_1.ApiError(`Can't find this route: ${req.originalUrl}`, constants_1.StatusCodes.NOT_FOUND_404));
});
app.use(error_middleware_1.globalErrorMiddleware);
// Database
(0, database_1.connectDatabase)();
// redis
(0, redis_client_1.initializeRedisClient)();
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
