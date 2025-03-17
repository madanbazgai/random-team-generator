import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Player = {
    id: string;
    name: string;
    skill: number;
};

interface PlayerState {
    players: Player[];
    addPlayer: (player: Player) => void;
    editPlayer: (id: string, updatedPlayer: Player) => void;
    deletePlayer: (id: string) => void;
    clearPlayers: () => void;
}

const usePlayerStore = create<PlayerState>()(
    persist(
        (set) => ({
            players: [],

            addPlayer: (player) => set((state) => ({
                players: [...state.players, player]
            })),

            editPlayer: (id, updatedPlayer) => set((state) => ({
                players: state.players.map((player) =>
                    player.id === id ? updatedPlayer : player
                )
            })),

            deletePlayer: (id) => set((state) => ({
                players: state.players.filter((player) => player.id !== id)
            })),

            clearPlayers: () => set({ players: [] })
        }),
        {
            name: 'player-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                players: state.players,
            }),
        }
    )
);

export default usePlayerStore;
