import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// middleware for erros
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wromg.";
  return res.status(status).json({
    sucess: false,
    status,
    message,
  });
});

mongoose.connect(process.env.MONGO_URL).then(
  (res) => console.log("connection established"),
  (err) => console.log("error in connection")
);

app.listen("8800", async () => {
  console.log("running");
  await connectToDb().then(mess => console.log(mess));
});

