import { StudentsDegrees } from "../models/student_model";

export const getStudentDegreesBySeatNo = async (SeatNo: number) => {
  const degreesDoc = await StudentsDegrees.findOne({
    seat_no: SeatNo,
  });
  return degreesDoc;
};

export const createStudentDegrees = async (degreesObj: Object) => {
  let degrees = await StudentsDegrees.create(degreesObj);
  return degrees;
};
