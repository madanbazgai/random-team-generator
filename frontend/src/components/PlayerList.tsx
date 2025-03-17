import usePlayerStore from "../store/player.store";

const PlayerList = () => {
  const { players, deletePlayer } = usePlayerStore();

  return (
    <div className="space-y-4">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex justify-between items-center p-4 border rounded"
        >
          <span>
            {player.name} (Skill: {player.skill})
          </span>
          <button
            onClick={() => deletePlayer(player.id)}
            className="p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
