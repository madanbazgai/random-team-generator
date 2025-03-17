import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlayer } from "../api/player.api";
import { toast } from "sonner";
import { Star } from "lucide-react";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState(3);
  const [position, setPosition] = useState("");
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("Player added successfully!");
      setName("");
      setSkill(3);
      setPosition("");
    },
    onError: (error) => {
      toast.error(`Failed to add player: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name,
      skill,
      position,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-lg bg-white/30 p-6 rounded-2xl shadow-lg border border-white/40"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Player
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            placeholder="E.g., Forward, Midfielder, etc."
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-3 bg-white/50 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Level
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setSkill(value)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  fill={value <= skill ? "#FACC15" : "none"}
                  stroke={value <= skill ? "#FACC15" : "#D1D5DB"}
                  className="hover:stroke-yellow-500 transition-colors"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Adding..." : "Add Player"}
      </button>
    </form>
  );
};

export default AddPlayer;