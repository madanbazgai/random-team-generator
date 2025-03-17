import useTeamStore from "../store/team.store";

const TeamList = () => {
  const { teams, deleteTeam } = useTeamStore();

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex justify-between items-center p-4 border rounded"
        >
          <span>{team.name}</span>
          <button
            onClick={() => deleteTeam(team.id)}
            className="p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
