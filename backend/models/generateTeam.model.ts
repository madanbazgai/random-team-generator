import mongoose, { Schema, Document } from "mongoose";
import type { IPlayer } from "./player.model.ts";

interface ITeam {
  name: string;
  players: mongoose.Types.ObjectId[] | IPlayer[];
}

export interface IGeneratedTeam extends Document {
  title: string;
  teams: ITeam[];
  shareId: string;
  createdAt: Date;
  updatedAt: Date;
}

const generatedTeamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    teams: [
      {
        name: {
          type: String,
          required: true,
        },
        players: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
      },
    ],
    shareId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const GeneratedTeam = mongoose.model<IGeneratedTeam>(
  "GeneratedTeam",
  generatedTeamSchema
);

export default GeneratedTeam;
