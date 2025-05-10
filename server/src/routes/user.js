import express from "express";
import {
  registerUser,
  loginUser,
  authenticateUser,
} from "../controller/user.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyToken, authenticateUser);

export default router;
