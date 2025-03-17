import { createFileRoute } from '@tanstack/react-router';
import AddTeam from "../components/AddTeam";
import TeamList from "../components/TeamList";

export const Route = createFileRoute('/teams')({
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center md:text-left">
          Teams
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AddTeam />
            </div>
          </div>
          <div className="lg:col-span-2">
            <TeamList />
          </div>
        </div>
      </div>
    </div>
  );
}