import { BASE_URL } from ".";

export interface Player {
  _id?: string;
  name: string;
  skill: number;
  position: string;
}

export const getPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${BASE_URL}/players`);
  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }
  return response.json();
};

export const addPlayer = async (
  player: Omit<Player, "_id">
): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });
  if (!response.ok) {
    throw new Error("Failed to add player");
  }
  return response.json();
};

export const updatePlayer = async (
  id: string,
  player: Omit<Player, "_id">
): Promise<Player> => {
  const response = await fetch(`${BASE_URL}/players/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });
  if (!response.ok) {
    throw new Error("Failed to update player");
  }
  return response.json();
};

export const deletePlayer = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/players/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete player");
  }
};
