import { TeamSchema } from "../validations/index.ts";
import Team from "../models/team.model.ts";
import type { Request, Response } from "express";

export const addTeam = async (req: Request, res: Response) => {
  try {
    const validatedData = TeamSchema.parse(req.body);
    const team = new Team(validatedData);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const editTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = TeamSchema.parse(req.body);
    const team = await Team.findByIdAndUpdate(id, validatedData, { new: true });
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
};
