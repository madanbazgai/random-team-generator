import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Flag, ArrowRight, Layers2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const navItems = [
  {
    to: "/players",
    icon: Users,
    title: "Manage Players",
    description: "Add, edit, and remove players for your team generation",
  },
  {
    to: "/teams",
    icon: Flag,
    title: "Manage Teams",
    description: "Create and manage team templates for generation",
  },
  {
    to: "/generated-team",
    icon: Layers2,
    title: "Generate Teams",
    description: "Generate teams based on players and team templates",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center md:text-left">
          Team Generator Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-md p-6 border border-white/40 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center mb-4">
                <item.icon size={24} className="text-indigo-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex justify-end">
                <span className="text-indigo-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                  Go to {item.title}
                  <ArrowRight size={18} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
