"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentDegrees = exports.getStudentDegreesBySeatNo = void 0;
const student_model_1 = require("../models/student_model");
const getStudentDegreesBySeatNo = async (SeatNo) => {
    const degreesDoc = await student_model_1.StudentsDegrees.findOne({
        seat_no: SeatNo,
    });
    return degreesDoc;
};
exports.getStudentDegreesBySeatNo = getStudentDegreesBySeatNo;
const createStudentDegrees = async (degreesObj) => {
    let degrees = await student_model_1.StudentsDegrees.create(degreesObj);
    return degrees;
};
exports.createStudentDegrees = createStudentDegrees;
