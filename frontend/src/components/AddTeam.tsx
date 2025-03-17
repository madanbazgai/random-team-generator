import { useState } from "react";
import useTeamStore from "../store/team.store";

const AddTeam = () => {
  const [name, setName] = useState("");
  const { addTeam } = useTeamStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeam({ id: Date.now().toString(), name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Add Team
      </button>
    </form>
  );
};

export default AddTeam;
