export const StudentsDegreesCollection = "students_degrees";

// ? حالة الطالب
export enum StudentStatus {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

// ? الأقسام
export enum Sections {
  SCIENCE_MATH = "SCIENCE_MATH",
  SCIENCE_BIOLOGY = "SCIENCE_BIOLOGY",
  LITERATURE = "LITERATURE",
}

// ? mongodb database events
export enum DatabaseEvents {
  CONNECTED = "connected",
  ERROR = "error",
}

// ? الدرجات النهائية
interface SubjectsMaxDegrees {
  [key: string]: number;
}

export const subjectsMaxDegrees: SubjectsMaxDegrees = {
  arabic: 80,
  foreign_1: 50,
  foreign_2: 40,
  math: 60,
  biology: 60,
  chemistry: 60,
  physics: 60,
  history: 60,
  geography: 60,
  philosophy: 60,
  psychology: 60,
};

// ? Response status codes
export enum StatusCodes {
  //* 2**
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,
  //! 4**
  BAD_REQUEST_400 = 400,
  UN_AUHROIZED_401 = 401,
  FORBIDDEN_403 = 403,
  NOT_FOUND_404 = 404,
  //! 5**
  INTERNAL_SERVER_ERROR_500 = 500,
}

export enum ResponseErrorCodes {
  NORMAL = "NORMAL",
}

// ? string check pattern
export const ALLOWED_TEXT_PATTERN = /^[a-zA-Z0-9_@.%\s\u0600-\u06FF-]+$/u;
