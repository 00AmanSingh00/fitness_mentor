import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" }); // Clear authentication cookie
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
