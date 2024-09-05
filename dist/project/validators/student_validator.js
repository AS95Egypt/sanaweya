"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudentDegreesValidator = exports.getStudentDegreesValidator = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../core/constants");
function checkSeatNo(type) {
    const validator = type === "param" ? express_validator_1.param : express_validator_1.body;
    return validator("seat_no")
        .notEmpty()
        .withMessage("please enter student seat no")
        .isNumeric()
        .withMessage("Invalid student seat no");
}
function checkStrField(fieldName, title) {
    return (0, express_validator_1.body)(fieldName)
        .notEmpty()
        .withMessage(`please enter ${title}.`)
        .isString()
        .withMessage(`this is not string.`)
        .isLength({ min: 3 })
        .withMessage(`too short ${title}.`)
        .isLength({ max: 100 })
        .withMessage(`too long ${title}.`)
        .matches(constants_1.ALLOWED_TEXT_PATTERN)
        .withMessage(`Only letters, numbers, _, @, ., and % are allowed in the input field`);
}
function checkEnumField(fieldName, title, enumType) {
    return (0, express_validator_1.body)(fieldName)
        .notEmpty()
        .withMessage(`please enter ${title}.`)
        .isString()
        .withMessage(`${title} must be a string`)
        .isIn(Object.values(enumType))
        .withMessage(`${title} value must be in (${Object.values(enumType).join(", ")})`);
}
function checkFloatField(fieldName, title, min, max) {
    let floatOptions = {};
    if (min && max) {
        floatOptions = { min, max };
    }
    else if (min && !max) {
        floatOptions = { min };
    }
    else if (!min && max) {
        floatOptions = { max };
    }
    return (0, express_validator_1.body)(fieldName)
        .notEmpty()
        .withMessage(`please enter ${title}.`)
        .isFloat(floatOptions)
        .withMessage(`${title} must be decimal number`);
}
exports.getStudentDegreesValidator = [checkSeatNo("param")];
// ? ================
// student name
const checkStudentName = checkStrField("student_name", "student name");
// school
const checkSchool = checkStrField("school", "school");
// القسم
const checkSection = checkEnumField("section", "section", constants_1.Sections);
// الأدارة التعليمية
const checkEduManagement = checkStrField("edu_management", "education management");
const checkSubjects = (0, express_validator_1.body)("subjects")
    .notEmpty()
    .withMessage("you should enter student subjects degrees")
    .custom((degrees, { req }) => {
    // TODO check min, max degree for each subject
    if (req.body.section === constants_1.Sections.SCIENCE_MATH) {
        if (!degrees.arabic ||
            !degrees.foreign_1 ||
            !degrees.foreign_2 ||
            !degrees.math ||
            !degrees.chemistry ||
            !degrees.physics) {
            throw new Error("you should set student's subjects");
        }
        if (!degrees.psychology && !degrees.philosophy) {
            throw new Error("you should set one of these subjects: psychology, philosophy");
        }
        if (degrees.psychology && degrees.philosophy) {
            throw new Error("you should set only one literature subject: psychology or philosophy");
        }
        if (degrees.biology || degrees.history || degrees.geography) {
            throw new Error("you cannot set these subjects: biology, history, geography");
        }
    }
    // check Biology subjects
    if (req.body.section === constants_1.Sections.SCIENCE_BIOLOGY) {
        if (!degrees.arabic ||
            !degrees.foreign_1 ||
            !degrees.foreign_2 ||
            !degrees.biology ||
            !degrees.chemistry ||
            !degrees.physics) {
            throw new Error("you should set student's subjects");
        }
        if (!degrees.psychology && !degrees.philosophy) {
            throw new Error("you should set one of these subjects: psychology, philosophy");
        }
        if (degrees.psychology && degrees.philosophy) {
            throw new Error("you should set only one literature subject: psychology or philosophy");
        }
        if (degrees.math || degrees.history || degrees.geography) {
            throw new Error("you cannot set these subjects: biology, history, geography");
        }
    }
    // check literature subjects
    if (req.body.section === constants_1.Sections.LITERATURE) {
        if (!degrees.arabic ||
            !degrees.foreign_1 ||
            !degrees.foreign_2 ||
            !degrees.history ||
            !degrees.geography ||
            !degrees.philosophy ||
            !degrees.psychology) {
            throw new Error("you should set student section's subjects");
        }
        if (degrees.math ||
            degrees.biology ||
            degrees.chemistry ||
            degrees.physics) {
            throw new Error("you cannot set these subjects: biology, math, chemistry, physics");
        }
    }
    return true;
});
exports.addStudentDegreesValidator = [
    checkStudentName,
    checkSchool,
    checkSection,
    checkEduManagement,
    checkSubjects,
    checkSeatNo("body"),
];
