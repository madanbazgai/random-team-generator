import { BASE_URL } from ".";

export interface GeneratedTeam {
  _id?: string;
  title: string;
  teams: {
    name: string;
    players: string[];
  }[];
  shareId: string;
  createdAt?: Date;
}

export interface GenerateTeamRequest {
  title: string;
  numberOfTeams: number;
}

export const generateTeams = async (
  data: GenerateTeamRequest
): Promise<GeneratedTeam> => {

  const response = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to generate teams");
  }

  return response.json();
};

export const getTeamByShareId = async (
  shareId: string
): Promise<GeneratedTeam> => {
  const response = await fetch(`${BASE_URL}/team/${shareId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch team session");
  }

  return response.json();
};
