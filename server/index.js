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

// CORS Configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URI : "http://localhost:3000", // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Handle preflight requests explicitly
app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

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