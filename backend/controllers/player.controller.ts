import { PlayerSchema } from "../validations/index.ts";
import Player from "../models/player.model.ts";
import type { Request, Response } from "express";

export const addPlayer = async (req: Request, res: Response) => {
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

export const editPlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = PlayerSchema.parse(req.body);
    const player = await Player.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.status(200).json(player);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
};
