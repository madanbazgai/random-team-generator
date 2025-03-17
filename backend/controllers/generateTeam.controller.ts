import type { Request, Response } from "express";

import { GenerateTeamSchema } from '../validations/index.ts';
import GeneratedTeam from '../models/generateTeam.model.ts';

export const generateTeams = async (req: Request, res: Response) => {
    try {
        const validatedData = GenerateTeamSchema.parse(req.body);
        const session = new GeneratedTeam(validatedData);
        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
};

export const getSessionByShareId = async (req: Request, res: Response) => {
    try {
        const { shareId } = req.params;
        const session = await GeneratedTeam.findOne({ shareId });
        if (!session) return res.status(404).json({ error: "Session not found" });
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
    }
};