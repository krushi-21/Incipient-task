import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import logger from "./config/logger.js";
import db from "./db/db.js";
import AppRoutes from "./components/routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

//set routes
app.use("/api/v1", AppRoutes);

app.all("*", (req, res, next) => {
  return next(
    res.status(404).send(`Can't find ${req.originalUrl} on this server!`)
  );
});

//listen to server
app.listen(port, () =>
  logger.info(">>> Server is up and running on port : " + port)
);
