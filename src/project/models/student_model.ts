// packages
import mongoose from "mongoose";
import {
  StudentsDegreesCollection,
  StudentStatus,
  Sections,
} from "../core/constants";

const studentDegreeSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      required: true,
      maxLength: [100, "Student name is too long"],
    },
    seat_no: {
      type: Number,
      required: true,
    },
    school: {
      type: String,
      required: true,
      maxLength: [100, "Student name is too long"],
    },
    edu_management: {
      type: String,
      required: true,
      maxLength: [100, "Student name is too long"],
    },
    section: {
      type: String,
      required: true,
      enum: {
        values: Object.values(Sections),
        message:
          "Student status value must be `SCIENCE_MATH`, `SCIENCE_BIOLOGY` or `LITERATURE`",
      },
    },
    fail_subjects_count: {
      type: Number,
      default: 0,
    },
    subjects: {
      arabic: {
        type: Number,
        min: [0, "arabic min degree is 0"],
        max: [80, "arabic max degree is 80"],
      },
      foreign_1: {
        type: Number,
        min: [0, "foreign language 1 min degree is 0"],
        max: [50, "foreign language 1 max degree is 50"],
      },
      foreign_2: {
        type: Number,
        min: [0, "foreign language 2 min degree is 0"],
        max: [40, "foreign language 2 max degree is 50"],
      },
      math: {
        type: Number,
        min: [0, "Math min degree is 0"],
        max: [60, "Math max degree is 60"],
      },
      history: {
        type: Number,
        min: [0, "History min degree is 0"],
        max: [60, "History max degree is 60"],
      },
      geography: {
        type: Number,
        min: [0, "Geography min degree is 0"],
        max: [60, "Geography max degree is 60"],
      },
      philosophy: {
        type: Number,
        min: [0, "Philosophy min degree is 0"],
        max: [60, "Philosophy max degree is 60"],
      },
      psychology: {
        type: Number,
        min: [0, "Psychology min degree is 0"],
        max: [60, "Psychology max degree is 60"],
      },
      biology: {
        type: Number,
        min: [0, "Biology min degree is 0"],
        max: [60, "Biology max degree is 60"],
      },
      chemistry: {
        type: Number,
        min: [0, "Chemistry min degree is 0"],
        max: [60, "Chemistry max degree is 60"],
      },
      geology: {
        type: Number,
        min: [0, "Geology min degree is 0"],
        max: [60, "Geology max degree is 60"],
      },
      physics: {
        type: Number,
        min: [0, "Physics min degree is 0"],
        max: [60, "Physics max degree is 60"],
      },
    },
    total_degree: {
      type: Number,
      min: [0, "min total degree is 0"],
      max: [410, "max total degree is 410"],
      required: true,
    },
    student_status: {
      type: String,
      required: true,
      enum: {
        values: Object.values(StudentStatus),
        message: "Student status value must be `SUCCESS` or `FAIL`",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create unique indexes
studentDegreeSchema.index({ seat_no: 1 }, { unique: true });

studentDegreeSchema.pre("validate", function (next) {
  // Math Subjects       [ arabic, foreign_1, foreign_2, math, psychology, chemistry, physics ]
  // Biology Subjects    [ arabic, foreign_1, foreign_2, philosophy, biology, chemistry, physics ]
  // Literature Subjects [arabic, foreign_1, foreign_2, history, geography, philosophy, psychology ]
  if (!this.subjects) {
    this.invalidate("subjects", "you should set student's subjects");
  }
  // check Math subjects
  if (this.subjects) {
    if (this.section === Sections.SCIENCE_MATH) {
      if (
        !this.subjects.arabic ||
        !this.subjects.foreign_1 ||
        !this.subjects.foreign_2 ||
        !this.subjects.math ||
        !this.subjects.chemistry ||
        !this.subjects.physics
      ) {
        this.invalidate("subjects", "you should set student's subjects");
      }
      if (!this.subjects.psychology && !this.subjects.philosophy) {
        this.invalidate(
          "subjects",
          "you should set one of these subjects: psychology, philosophy"
        );
      }
      if (this.subjects.psychology && this.subjects.philosophy) {
        this.invalidate(
          "subjects",
          "you should set only one literature subject: psychology or philosophy"
        );
      }
      if (
        this.subjects.biology ||
        this.subjects.history ||
        this.subjects.geography
      ) {
        this.invalidate(
          "subjects",
          "you cannot set these subjects: biology, history, geography"
        );
      }
    }
    // check Biology subjects
    if (this.section === Sections.SCIENCE_BIOLOGY) {
      if (
        !this.subjects.arabic ||
        !this.subjects.foreign_1 ||
        !this.subjects.foreign_2 ||
        !this.subjects.biology ||
        !this.subjects.chemistry ||
        !this.subjects.physics
      ) {
        this.invalidate("subjects", "you should set student's subjects");
      }
      if (!this.subjects.psychology && !this.subjects.philosophy) {
        this.invalidate(
          "subjects",
          "you should set one of these subjects: psychology, philosophy"
        );
      }
      if (this.subjects.psychology && this.subjects.philosophy) {
        this.invalidate(
          "subjects",
          "you should set only one literature subject: psychology or philosophy"
        );
      }
      if (
        this.subjects.math ||
        this.subjects.history ||
        this.subjects.geography
      ) {
        this.invalidate(
          "subjects",
          "you cannot set these subjects: biology, history, geography"
        );
      }
    }
    // check literature subjects
    if (this.section === Sections.LITERATURE) {
      if (
        !this.subjects.arabic ||
        !this.subjects.foreign_1 ||
        !this.subjects.foreign_2 ||
        !this.subjects.history ||
        !this.subjects.geography ||
        !this.subjects.philosophy ||
        !this.subjects.psychology
      ) {
        this.invalidate(
          "subjects",
          "you should set student section's subjects"
        );
      }
      if (
        this.subjects.math ||
        this.subjects.biology ||
        this.subjects.chemistry ||
        this.subjects.physics
      ) {
        this.invalidate(
          "subjects",
          "you cannot set these subjects: biology, math, chemistry, physics"
        );
      }
    }
  }
  next();
});

export const StudentsDegrees = mongoose.model(
  StudentsDegreesCollection,
  studentDegreeSchema
);
