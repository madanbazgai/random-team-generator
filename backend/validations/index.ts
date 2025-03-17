import { z } from "zod";

export const PlayerSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  skill: z.number().min(1).max(5),
});

export const TeamSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
});

export const GenerateTeamSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  numberOfTeams: z.number().min(2, "At least 2 teams are required"),
});
