import { createFileRoute } from "@tanstack/react-router";
import AddPlayer from "../components/AddPlayer";
import PlayerList from "../components/PlayerList";
import AddTeam from "../components/AddTeam";
import TeamList from "../components/TeamList";
import GenerateTeams from "../components/GenerateTeam";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Random Team Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Players</h2>
          <AddPlayer />
          <PlayerList />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Teams</h2>
          <AddTeam />
          <TeamList />
        </div>
      </div>
      <div className="mt-8">
        <GenerateTeams />
      </div>
    </div>
  );
}
