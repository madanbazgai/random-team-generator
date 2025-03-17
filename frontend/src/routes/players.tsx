import { createFileRoute } from "@tanstack/react-router";
import AddPlayer from "../components/AddPlayer";
import PlayerList from "../components/PlayerList";

export const Route = createFileRoute("/players")({
  component: PlayersPage,
});

function PlayersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center md:text-left">
          Players
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AddPlayer />
            </div>
          </div>
          <div className="lg:col-span-2">
            <PlayerList />
          </div>
        </div>
      </div>
    </div>
  );
}
