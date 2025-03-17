import express from "express";

import {
  addTeam,
  editTeam,
  deleteTeam,
  getTeams,
} from "../controllers/team.controller.ts";

const router = express.Router();

router.post("/teams", addTeam);
router.put("/teams/:id", editTeam);
router.delete("/teams/:id", deleteTeam);
router.get("/teams", getTeams);

export default router;
