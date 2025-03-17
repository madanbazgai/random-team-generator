import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateTeams } from "../api/generatedTeam.api";
import { Plus, Minus, Loader2 } from "lucide-react";
import { getPlayers } from "../api/player.api";

const GenerateTeam = () => {
  const [title, setTitle] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const { data: players } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });
  const {
    mutate,
    data: generatedTeams,
    isPending,
  } = useMutation({
    mutationFn: generateTeams,
    onSuccess: () => {
      toast.success("Teams generated successfully!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate teams"
      );
    },
  });

  const handleGenerate = () => {
    if (title.trim() && players.length >= numberOfTeams * 2) {
      mutate({
        title,
        numberOfTeams,
      });
    } else if (!title.trim()) {
      toast.error("Please enter a title for the team generation");
    } else {
      toast.error(
        `Need at least ${numberOfTeams * 2} players to generate ${numberOfTeams} teams`
      );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 pb-0">
          <h3 className="text-2xl font-bold text-center">Generate Teams</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Session Title
            </label>
            <input
              type="text"
              placeholder="E.g., Friday Futsal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Teams
            </label>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setNumberOfTeams(Math.max(2, numberOfTeams - 1))}
                disabled={numberOfTeams <= 2}
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{numberOfTeams}</span>
              <button
                className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
                onClick={() => setNumberOfTeams(numberOfTeams + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </div>
            ) : (
              "Generate Teams"
            )}
          </button>
        </div>
      </div>

      {generatedTeams && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-xl font-bold">{title || "Generated Teams"}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedTeams.teams.map((team, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4">
                    <h3 className="font-bold text-white">{team.name}</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1">
                      {team.players.map((player, playerIndex) => (
                        <li
                          key={playerIndex}
                          className="flex justify-between items-center py-1 border-b last:border-0"
                        >
                          <span>{player.split(" (")[0]}</span>
                          <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                            Skill: {player.split("(")[1].replace(")", "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateTeam;
