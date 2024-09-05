// packages
import asyncHandler from "express-async-handler";
import express from "express";
// app
import {
  getStudentDegreesBySeatNo,
  createStudentDegrees,
} from "../repos/student_repo";
import {
  subjectsMaxDegrees,
  StudentStatus,
  StatusCodes,
  StudentsDegreesCollection,
} from "../core/constants";
import { getRedisClient } from "../core/redis_client";

export const getStudentDegrees = asyncHandler(
  async (req: any, res: any, next: express.NextFunction) => {
    // get param value
    const seatNo: number = parseInt(req.params.seat_no);

    console.log("get student degree");

    const studentDegrees = await getStudentDegreesBySeatNo(seatNo);
    if (!studentDegrees) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // set for later fetch from redis
    const client = getRedisClient();
    await client.set(
      `${StudentsDegreesCollection}:${seatNo}`,
      JSON.stringify(studentDegrees)
    );

    return res.send({
      success: true,
      data: {
        student_degrees: studentDegrees,
      },
    });
  }
);

export const addStudentDegrees = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { student_name, seat_no, school, edu_management, section, subjects } =
      req.body;

    let fail_subjects_count: number = 0;
    let student_status = StudentStatus.SUCCESS;
    let total_degree = 0;

    Object.entries(subjects).forEach((subject) => {
      const [key, value] = subject;
      const subjectMaxDegree: number = subjectsMaxDegrees[key];
      // subjectsMaxDegrees[key as keyof typeof subjectsMaxDegrees];
      if ((value as number) < subjectMaxDegree / 2) {
        fail_subjects_count++;
      }
      total_degree += value as number;
    });

    student_status =
      fail_subjects_count === 0 ? StudentStatus.SUCCESS : StudentStatus.FAIL;

    // 1) add studnet degrees
    const studentDegrees = await createStudentDegrees({
      student_name,
      seat_no,
      school,
      edu_management,
      section,
      subjects,
      fail_subjects_count,
      student_status,
      total_degree,
    });

    res.status(StatusCodes.CREATED_201).json({
      success: true,
      data: studentDegrees,
      message: "Student degrees added successfully",
    });
  }
);
