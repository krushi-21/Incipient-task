import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../config/logger.js";

const DB = process.env.MONGO_PATH;
const db = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info(">>> DB connected Successfully!"))
  .catch((e) => logger.info("DB connection error", e));

export default db;
