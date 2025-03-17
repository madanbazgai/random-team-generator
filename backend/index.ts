import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import teamRoutes from "./routes/team.route.ts";
import playerRoutes from "./routes/player.route.ts";
import generateTeamRoutes from "./routes/generateTeam.route.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/team";

if (!MONGODB_URI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/api", teamRoutes);
app.use("/api", playerRoutes);
app.use("/api", generateTeamRoutes);

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
