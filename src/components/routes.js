import express from "express";
import user from "./users/userRoutes.js";
import role from "./Roles/roleRoute.js";
const router = express.Router();

router.use("/users", user);

router.use("/roles", role);

export default router;
