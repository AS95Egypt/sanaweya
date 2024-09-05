"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_TEXT_PATTERN = exports.ResponseErrorCodes = exports.StatusCodes = exports.subjectsMaxDegrees = exports.DatabaseEvents = exports.Sections = exports.StudentStatus = exports.StudentsDegreesCollection = void 0;
exports.StudentsDegreesCollection = "students_degrees";
// ? حالة الطالب
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["SUCCESS"] = "SUCCESS";
    StudentStatus["FAIL"] = "FAIL";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
// ? الأقسام
var Sections;
(function (Sections) {
    Sections["SCIENCE_MATH"] = "SCIENCE_MATH";
    Sections["SCIENCE_BIOLOGY"] = "SCIENCE_BIOLOGY";
    Sections["LITERATURE"] = "LITERATURE";
})(Sections || (exports.Sections = Sections = {}));
// ? mongodb database events
var DatabaseEvents;
(function (DatabaseEvents) {
    DatabaseEvents["CONNECTED"] = "connected";
    DatabaseEvents["ERROR"] = "error";
})(DatabaseEvents || (exports.DatabaseEvents = DatabaseEvents = {}));
exports.subjectsMaxDegrees = {
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
var StatusCodes;
(function (StatusCodes) {
    //* 2**
    StatusCodes[StatusCodes["OK_200"] = 200] = "OK_200";
    StatusCodes[StatusCodes["CREATED_201"] = 201] = "CREATED_201";
    StatusCodes[StatusCodes["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    //! 4**
    StatusCodes[StatusCodes["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
    StatusCodes[StatusCodes["UN_AUHROIZED_401"] = 401] = "UN_AUHROIZED_401";
    StatusCodes[StatusCodes["FORBIDDEN_403"] = 403] = "FORBIDDEN_403";
    StatusCodes[StatusCodes["NOT_FOUND_404"] = 404] = "NOT_FOUND_404";
    //! 5**
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR_500"] = 500] = "INTERNAL_SERVER_ERROR_500";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
var ResponseErrorCodes;
(function (ResponseErrorCodes) {
    ResponseErrorCodes["NORMAL"] = "NORMAL";
})(ResponseErrorCodes || (exports.ResponseErrorCodes = ResponseErrorCodes = {}));
// ? string check pattern
exports.ALLOWED_TEXT_PATTERN = /^[a-zA-Z0-9_@.%\s\u0600-\u06FF-]+$/u;
