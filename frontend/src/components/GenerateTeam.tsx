import { useState } from "react";
import useTeamStore from "../store/team.store";

const GenerateTeams = () => {
  const [title, setTitle] = useState("");
  const { generateTeams, generatedTeams, teamGenerationTitle } = useTeamStore();

  const handleGenerate = () => {
    generateTeams(title);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Title (e.g., Friday Futsal)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleGenerate}
        className="w-full p-2 bg-purple-500 text-white rounded"
      >
        Generate Teams
      </button>
      {generatedTeams.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{teamGenerationTitle}</h2>
          {generatedTeams.map((team) => (
            <div key={team.id} className="p-4 border rounded">
              <h3 className="font-bold">{team.name}</h3>
              <ul>
                {team.players?.map((player) => (
                  <li key={player.id}>
                    {player.name} (Skill: {player.skill})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateTeams;
