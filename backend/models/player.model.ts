import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  skill: number;
  createdAt: Date;
  updatedAt: Date;
}

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    skill: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model<IPlayer>("Player", playerSchema);

export default Player;
