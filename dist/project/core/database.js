"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
// packages
const mongoose_1 = __importDefault(require("mongoose"));
// app
const constants_1 = require("./constants");
const connectDatabase = () => {
    const DATABASE_URL = process.env.DATABASE_URL || " ";
    mongoose_1.default.connect(DATABASE_URL, {
        autoIndex: true,
    });
    mongoose_1.default.Promise = global.Promise; // Tell Mongoose to use ES6 promises
    const database = mongoose_1.default.connection;
    // on success
    database.once(constants_1.DatabaseEvents.CONNECTED, () => {
        console.log("Mongodb server has started!");
    });
    // on error
    database.on(constants_1.DatabaseEvents.ERROR, (error) => {
        throw new Error(error.message);
    });
};
exports.connectDatabase = connectDatabase;
