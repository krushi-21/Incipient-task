import express from "express";
import userController from "./userController.js";
import { createUserRequest } from "./userValidation.js";

const router = express.Router();

router
  .get("/read/:id", userController.read)
  .post("/create", createUserRequest, userController.create)
  .delete("/delete/:id", userController.deleteUser)
  .patch("/update/:id", userController.update);

export default router;
