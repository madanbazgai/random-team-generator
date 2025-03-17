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
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api", teamRoutes);
app.use("/api", playerRoutes);
app.use("/api", generateTeamRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));
