import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayers, deletePlayer } from "../api/player.api";
import { toast } from "sonner";
import { Star, Trash2, AlertTriangle, X } from "lucide-react";

interface DeleteModalState {
  isOpen: boolean;
  playerId: string | null;
  playerName: string;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  playerName: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, playerName }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 max-w-md w-full border border-white/40 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Confirm Deletion</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-gray-700 mb-4 text-sm">
          Are you sure you want to delete{" "}
          <span className="font-medium">{playerName}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerList = () => {
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    playerId: null,
    playerName: "",
  });

  const {
    data: players = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  const { mutate: removeMutation } = useMutation({
    mutationFn: (id: string) => deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("Player removed successfully");
      closeDeleteModal();
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove player: ${error.message}`);
      closeDeleteModal();
    },
  });

  const openDeleteModal = (playerId: string, playerName: string) => {
    setDeleteModal({
      isOpen: true,
      playerId,
      playerName,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      playerId: null,
      playerName: "",
    });
  };

  const confirmDelete = () => {
    if (deleteModal.playerId) {
      removeMutation(deleteModal.playerId);
    }
  };

  const renderSkillStars = (skill: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            size={16}
            fill={value <= skill ? "#FACC15" : "none"}
            stroke={value <= skill ? "#FACC15" : "#D1D5DB"}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 backdrop-blur-lg bg-white/30 rounded-xl border border-white/40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/70 backdrop-blur-sm p-3 rounded-xl border border-red-200">
        <p className="text-red-600 text-sm">Error loading players: {error.message}</p>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center p-4 backdrop-blur-lg bg-white/30 rounded-xl border border-white/40">
        <p className="text-gray-700 text-sm">No players added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
        Player List
      </h2>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player._id}
            className="backdrop-blur-lg bg-white/30 py-3 px-4 rounded-xl shadow-sm border border-white/40 hover:shadow-md transition-all flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium text-gray-800">{player.name}</h3>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-600">
                    {player.position || "No position"}
                  </p>
                  <div className="mt-0.5">{renderSkillStars(player.skill)}</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => openDeleteModal(player._id!, player.name)}
              className="p-1.5 text-red-500 hover:bg-red-50/70 rounded-full transition-colors"
              aria-label="Delete player"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        playerName={deleteModal.playerName}
      />
    </div>
  );
};

export default PlayerList;