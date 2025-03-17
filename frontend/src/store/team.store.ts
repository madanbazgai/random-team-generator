import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import usePlayerStore, { Player } from './player.store';

export type Team = {
    id: string;
    name: string;
    players?: Player[];
};

interface TeamState {
    teams: Team[];
    numberOfTeams: number;
    generatedTeams: Team[];
    teamGenerationTitle: string;
    addTeam: (team: Team) => void;
    editTeam: (id: string, updatedTeam: Team) => void;
    deleteTeam: (id: string) => void;
    updateNumberOfTeams: (count: number) => void;
    generateTeams: (title: string) => void;
    clearTeams: () => void;
}

const useTeamStore = create<TeamState>()(
    persist(
        (set) => ({
            teams: [],
            numberOfTeams: 2,
            generatedTeams: [],
            teamGenerationTitle: '',

            addTeam: (team) => set((state) => ({
                teams: [...state.teams, team]
            })),

            editTeam: (id, updatedTeam) => set((state) => ({
                teams: state.teams.map((team) =>
                    team.id === id ? updatedTeam : team
                )
            })),

            deleteTeam: (id) => set((state) => ({
                teams: state.teams.filter((team) => team.id !== id)
            })),

            updateNumberOfTeams: (count) => set({
                numberOfTeams: count
            }),

            generateTeams: (title) => set((state) => {
                const players = usePlayerStore.getState().players;
                if (players.length < state.teams.length) {
                    return { generatedTeams: [], teamGenerationTitle: title };
                }

                // Sort players by skill level
                const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);
                const teamSize = Math.ceil(players.length / state.teams.length);

                const generatedTeams = state.teams.map((team, index) => ({
                    ...team,
                    players: sortedPlayers.slice(index * teamSize, (index + 1) * teamSize),
                }));

                return { generatedTeams, teamGenerationTitle: title };
            }),

            clearTeams: () => set({
                teams: [],
                generatedTeams: [],
                teamGenerationTitle: ''
            })
        }),
        {
            name: 'team-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                teams: state.teams,
                numberOfTeams: state.numberOfTeams,
            }),
        }
    )
);

export default useTeamStore;