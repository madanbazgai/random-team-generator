import type { Request, Response, RequestHandler } from "express";
import { PlayerSchema } from "../validations/index.ts";
import Player from "../models/player.model.ts";

export const addPlayer: RequestHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = PlayerSchema.parse(req.body);
    const player = new Player(validatedData);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const deletePlayer: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      res.status(404).json({ error: "Player not found" });
      return;
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const getPlayers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
};