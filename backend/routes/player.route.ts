import express from "express";
import {
  addPlayer,
  deletePlayer,
  editPlayer,
  getPlayers,
} from "../controllers/player.controller.ts";

const router = express.Router();

router.post("/players", addPlayer);
router.put("/players/:id", editPlayer);
router.delete("/players/:id", deletePlayer);
router.get("/players", getPlayers);

export default router;
