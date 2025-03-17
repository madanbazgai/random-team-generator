import type { Request, Response, RequestHandler } from "express";
import { nanoid } from "nanoid";
import { GenerateTeamSchema } from "../validations/index.ts";
import GeneratedTeam from "../models/generateTeam.model.ts";
import Player from "../models/player.model.ts";

const balanceTeams = (
  players: { name: string; skill: number }[],
  numberOfTeams: number
) => {
  players.sort((a, b) => b.skill - a.skill);

  const teams = Array.from({ length: numberOfTeams }, (_, i) => ({
    name: `Team ${i + 1}`,
    players: [],
    totalSkill: 0,
  }));

  players.forEach((player) => {
    teams.sort((a, b) => a.totalSkill - b.totalSkill);

    teams[0].players.push(player);
    teams[0].totalSkill += player.skill;
  });

  return teams;
};

export const generateTeams: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, numberOfTeams } = GenerateTeamSchema.parse(req.body);

    const players = await Player.find();

    console.log(players);

    if (players.length < numberOfTeams * 2) {
      res.status(400).json({
        error: `Need at least ${
          numberOfTeams * 2
        } players to create ${numberOfTeams} teams`,
      });
      return;
    }

    const playerData = players.map((player) => ({
      _id: player._id,
      name: player.name,
      skill: player.skill,
    }));

    const balancedTeams = balanceTeams(playerData, numberOfTeams);

    const shareId = nanoid(10);

    const teamsForDb = balancedTeams.map((team) => ({
      name: team.name,
      players: team.players.map((player) => player._id),
    }));

    const generatedTeam = new GeneratedTeam({
      title: title || "Generated Teams",
      teams: teamsForDb,
      shareId,
    });

    await generatedTeam.save();

    const teamsForResponse = balancedTeams.map((team) => ({
      name: team.name,
      players: team.players.map((p) => `${p.name} (${p.skill})`),
    }));

    res.status(201).json({
      _id: generatedTeam._id,
      title: generatedTeam.title,
      teams: teamsForResponse,
      shareId,
      createdAt: generatedTeam.createdAt,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
};

export const getSessionByShareId: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { shareId } = req.params;
    const session = await GeneratedTeam.findOne({ shareId }).populate(
      "teams.players"
    );

    if (!session) {
      res.status(404).json({ error: "Team session not found" });
      return;
    }

    res.status(200).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
};
