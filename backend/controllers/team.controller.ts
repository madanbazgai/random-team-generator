import { TeamSchema } from "../validations/index.ts";
import Team from "../models/team.model.ts";
import type { Request, Response, RequestHandler } from "express";

export const addTeam: RequestHandler = async (req: Request, res: Response) => {
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

export const deleteTeam: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      res.status(404).json({ error: "Team not found" });
      return;
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const getTeams: RequestHandler = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
};
