import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeam as addTeamApi } from "../api/team.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TeamData {
  name: string;
  players: string[];
}

const AddTeam = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (data: TeamData) => addTeamApi(data),
    onSuccess: () => {
      toast.success("Team added successfully");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setName("");
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, players: [] });
  };
  
  return (
    <div className="backdrop-blur-lg bg-white/30 p-6 rounded-2xl shadow-lg border border-white/40">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Team</h2>
      
      {mutation.isError && (
        <div className="mb-5 p-3 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-xl border border-red-200/50">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "An error occurred"}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="teamName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Team Name
          </label>
          <input
            id="teamName"
            type="text"
            placeholder="Enter team name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 backdrop-blur-sm transition-all"
            required
            disabled={mutation.isPending}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full p-3 rounded-xl text-white font-medium transition-all ${
            mutation.isPending
              ? "bg-gradient-to-r from-indigo-400/80 to-purple-400/80 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg"
          }`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Adding...
            </span>
          ) : (
            "Add Team"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTeam;