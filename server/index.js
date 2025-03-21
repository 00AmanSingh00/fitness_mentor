import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import logoutRoute from "./routes/logout.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:3000", // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/logout", logoutRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Fitness Mentor API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));