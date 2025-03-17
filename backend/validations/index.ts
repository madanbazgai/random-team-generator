import { z } from 'zod';

export const PlayerSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    skill: z.number().min(1).max(5),
});

export const TeamSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
});

export const GenerateTeamSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    teams: z.array(
        z.object({
            name: z.string().min(1, "Team name is required"),
            players: z.array(z.string()),
        })
    ),
    shareId: z.string().min(1, "Share ID is required"),
});