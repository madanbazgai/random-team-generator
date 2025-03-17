import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model<ITeam>("Team", teamSchema);

export default Team;
