import { BASE_URL } from ".";

export interface Team {
  _id?: string;
  name: string;
  players: string[];
}

export const getTeams = async (): Promise<Team[]> => {
  const response = await fetch(`${BASE_URL}/teams`);
  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }
  return response.json();
};

export const addTeam = async (team: Omit<Team, "_id">): Promise<Team> => {
  const response = await fetch(`${BASE_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  if (!response.ok) {
    throw new Error("Failed to add team");
  }
  return response.json();
};

export const updateTeam = async (
  id: string,
  team: Omit<Team, "_id">
): Promise<Team> => {
  const response = await fetch(`${BASE_URL}/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  if (!response.ok) {
    throw new Error("Failed to update team");
  }
  return response.json();
};

export const deleteTeam = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/teams/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete team");
  }
};
