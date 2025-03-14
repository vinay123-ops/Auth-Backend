import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

export default router;
