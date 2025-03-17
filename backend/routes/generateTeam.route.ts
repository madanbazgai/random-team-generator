import express from "express";
import {
  generateTeams,
  getSessionByShareId,
} from "../controllers/generateTeam.controller.ts";

const router = express.Router();

router.post("/generate", generateTeams);
router.get("/team/:shareId", getSessionByShareId);

export default router;
