// packages
import express from "express";
// app
import {
  getStudentDegrees,
  addStudentDegrees,
} from "../handlers/student_handler";
import {
  getStudentDegreesValidator,
  addStudentDegreesValidator,
} from "../validators/student_validator";
import { cacheMiddleware } from "../core/cache_middleware";

// objects
const router = express.Router();

// ------ /student-degrees
router
  .route("/student-degrees")
  .post(addStudentDegreesValidator, addStudentDegrees);

router
  .route("/student-degrees/:seat_no")
  .get(getStudentDegreesValidator, cacheMiddleware, getStudentDegrees);

export const StudentRouter = router;
