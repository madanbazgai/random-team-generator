import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import GenerateTeams from "../components/GenerateTeam";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Team Generator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Link
          to="/players"
          className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Manage Players</h2>
          <p className="text-gray-600 mb-4">Add, edit, and remove players for your team generation</p>
          <div className="flex justify-end">
            <span className="text-indigo-500 font-medium flex items-center">
              Go to Players
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </Link>
        
        <Link
          to="/teams"
          className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Manage Teams</h2>
          <p className="text-gray-600 mb-4">Create and manage team templates for generation</p>
          <div className="flex justify-end">
            <span className="text-indigo-500 font-medium flex items-center">
              Go to Teams
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Generate Teams</h2>
        <GenerateTeams />
      </div>
    </div>
  );
}