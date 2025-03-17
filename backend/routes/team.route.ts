import express from "express";
import {
  addTeam,
  deleteTeam,
  getTeams,
} from "../controllers/team.controller.ts";

const router = express.Router();

router.post("/teams", addTeam);
router.delete("/teams/:id", deleteTeam);
router.get("/teams", getTeams);

export default router;
