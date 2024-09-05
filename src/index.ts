// packages
import express from "express";
import compression from "compression";
import cors from "cors";
import hpp from "hpp";

import dotenv from "dotenv";

dotenv.config();

// app
import { connectDatabase } from "./project/core/database";
import { StudentRouter } from "./project/routes/student_router";
import { ApiError } from "./project/core/api_error";
import { StatusCodes } from "./project/core/constants";
import { globalErrorMiddleware } from "./project/core/error_middleware";
import { initializeRedisClient } from "./project/core/redis_client";

// Server
const app = express();

// Middlewares
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(hpp());

// Routes
app.use(StudentRouter);

// handle not found routes
app.all("*", (req, res, next) => {
  next(
    new ApiError(
      `Can't find this route: ${req.originalUrl}`,
      StatusCodes.NOT_FOUND_404
    )
  );
});

app.use(globalErrorMiddleware);

// Database
connectDatabase();

// redis
initializeRedisClient();

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
