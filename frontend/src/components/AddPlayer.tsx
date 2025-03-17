import { useState } from "react";
import usePlayerStore from "../store/player.store";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState<number>(3);
  const { addPlayer } = usePlayerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlayer({
      id: Date.now().toString(),
      name,
      skill,
    });
    setName("");
    setSkill(3);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <div>
        <label className="block mb-2">Skill Level: {skill}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={skill}
          onChange={(e) => setSkill(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayer;
