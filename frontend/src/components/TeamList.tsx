import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeams, deleteTeam } from "../api/team.api";
import { toast } from "sonner";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";

interface DeleteModalState {
  isOpen: boolean;
  teamId: string | null;
  teamName: string;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  teamName,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/40 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{teamName}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamList = () => {
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    teamId: null,
    teamName: "",
  });

  const {
    data: teams = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: string) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("Team removed successfully");
      closeDeleteModal();
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove team: ${error.message}`);
      closeDeleteModal();
    },
  });

  const openDeleteModal = (teamId: string, teamName: string) => {
    setDeleteModal({
      isOpen: true,
      teamId,
      teamName,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      teamId: null,
      teamName: "",
    });
  };

  const confirmDelete = () => {
    if (deleteModal.teamId) {
      deleteMutation(deleteModal.teamId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 backdrop-blur-lg bg-white/30 rounded-2xl border border-white/40">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <p className="text-gray-600 font-medium">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/70 backdrop-blur-sm p-6 rounded-2xl border border-red-200/50 shadow-sm">
        <h3 className="text-red-700 font-semibold text-lg mb-2">
          Unable to load teams
        </h3>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="bg-amber-50/70 backdrop-blur-sm p-8 rounded-2xl border border-amber-200/50 shadow-sm text-center">
        <h3 className="text-amber-700 font-semibold text-lg mb-2">
          No teams found
        </h3>
        <p className="text-amber-600">Create a new team to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
        Team List
      </h2>

      <div className="space-y-3">
        {teams.map((team) => (
          <div
            key={team._id}
            className="flex justify-between items-center px-5 py-4 backdrop-blur-lg bg-white/30 rounded-xl shadow-sm border border-white/40 hover:shadow-md transition-all"
          >
            <span className="font-medium text-gray-800">{team.name}</span>
            <button
              onClick={() => openDeleteModal(team._id!, team.name)}
              className="p-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-1.5 text-sm shadow-sm"
              aria-label="Delete team"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        teamName={deleteModal.teamName}
      />
    </div>
  );
};

export default TeamList;
