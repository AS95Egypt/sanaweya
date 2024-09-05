"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudentDegrees = exports.getStudentDegrees = void 0;
// packages
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// app
const student_repo_1 = require("../repos/student_repo");
const constants_1 = require("../core/constants");
const redis_client_1 = require("../core/redis_client");
exports.getStudentDegrees = (0, express_async_handler_1.default)(async (req, res, next) => {
    // get param value
    const seatNo = parseInt(req.params.seat_no);
    console.log("get student degree");
    const studentDegrees = await (0, student_repo_1.getStudentDegreesBySeatNo)(seatNo);
    if (!studentDegrees) {
        return res
            .status(404)
            .json({ success: false, message: "Student not found" });
    }
    // set for later fetch from redis
    const client = (0, redis_client_1.getRedisClient)();
    await client.set(`${constants_1.StudentsDegreesCollection}:${seatNo}`, JSON.stringify(studentDegrees));
    return res.send({
        success: true,
        data: {
            student_degrees: studentDegrees,
        },
    });
});
exports.addStudentDegrees = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { student_name, seat_no, school, edu_management, section, subjects } = req.body;
    let fail_subjects_count = 0;
    let student_status = constants_1.StudentStatus.SUCCESS;
    let total_degree = 0;
    Object.entries(subjects).forEach((subject) => {
        const [key, value] = subject;
        const subjectMaxDegree = constants_1.subjectsMaxDegrees[key];
        // subjectsMaxDegrees[key as keyof typeof subjectsMaxDegrees];
        if (value < subjectMaxDegree / 2) {
            fail_subjects_count++;
        }
        total_degree += value;
    });
    student_status =
        fail_subjects_count === 0 ? constants_1.StudentStatus.SUCCESS : constants_1.StudentStatus.FAIL;
    // 1) add studnet degrees
    const studentDegrees = await (0, student_repo_1.createStudentDegrees)({
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
    res.status(constants_1.StatusCodes.CREATED_201).json({
        success: true,
        data: studentDegrees,
        message: "Student degrees added successfully",
    });
});
