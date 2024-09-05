// packages
import mongoose from "mongoose";
// app
import { DatabaseEvents } from "./constants";

export const connectDatabase = () => {
  const DATABASE_URL = process.env.DATABASE_URL || " ";

  mongoose.connect(DATABASE_URL, {
    autoIndex: true,
  });
  mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

  const database = mongoose.connection;
  // on success
  database.once(DatabaseEvents.CONNECTED, () => {
    console.log("Mongodb server has started!");
  });

  // on error
  database.on(DatabaseEvents.ERROR, (error: Error) => {
    throw new Error(error.message);
  });
};
