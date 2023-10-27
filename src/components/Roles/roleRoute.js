import express from "express";
import roleController from "./roleController.js";

const router = express.Router();

router
  .get("/read", roleController.read)
  .post("/createRole", roleController.createRole)
  .post("/assignRole", roleController.assignRole)
  .delete("/delete/:id", roleController.deleteRole)
  .patch("/update/:id", roleController.update);

export default router;
