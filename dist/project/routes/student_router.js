"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
// packages
const express_1 = __importDefault(require("express"));
// app
const student_handler_1 = require("../handlers/student_handler");
const student_validator_1 = require("../validators/student_validator");
const cache_middleware_1 = require("../core/cache_middleware");
// objects
const router = express_1.default.Router();
// ------ /student-degrees
router
    .route("/student-degrees")
    .post(student_validator_1.addStudentDegreesValidator, student_handler_1.addStudentDegrees);
router
    .route("/student-degrees/:seat_no")
    .get(student_validator_1.getStudentDegreesValidator, cache_middleware_1.cacheMiddleware, student_handler_1.getStudentDegrees);
exports.StudentRouter = router;
