import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userrouter from "./routes/userrouter.js";
import resumeRouter from "./routes/resumeroutes.js";
import aiRouter from "./routes/airotes.js";

await connectDB();
console.log("data base connected");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
    ],
    credentials: true,
  })
);

console.log("server created");

app.get("/", (req, res) => res.send("server is live..."));

app.use("/api/users", userrouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

console.log("patidarji on top");