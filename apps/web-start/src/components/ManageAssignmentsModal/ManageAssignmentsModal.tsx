import { useState } from 'react';
import { useAssignments, useCreateAssignment, useUpdateAssignment, useDeleteAssignment } from '../../hooks/useAssignments';
import { COLORS, OPACITY } from '../../constants/theme';
import type { AssignmentCreateIn, AssignmentUpdateIn, AssignmentOut } from '@repo/api';

interface ManageAssignmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export function ManageAssignmentsModal({ isOpen, onClose, courseId }: ManageAssignmentsModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxPoints, setMaxPoints] = useState(100);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<AssignmentOut | null>(null);

  const { data: assignments, isLoading } = useAssignments(courseId);
  const createMutation = useCreateAssignment();
  const updateMutation = useUpdateAssignment();
  const deleteMutation = useDeleteAssignment();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const createData: AssignmentCreateIn = {
      title,
      description,
      instructions,
      dueDate,
      maxPoints,
      allowedTypes: ['TRADITIONAL_CODE'],
      courseId,
      isActive: true,
    };

    createMutation.mutate(createData, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        setInstructions('');
        setDueDate('');
        setMaxPoints(100);
        setIsCreating(false);
        alert('Assignment created successfully!');
      },
      onError: (error: any) => {
        alert(`Failed to create assignment: ${error.message}`);
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssignment) return;

    const updateData: AssignmentUpdateIn = {
      title,
      description,
      instructions,
      dueDate,
      maxPoints,
    };

    updateMutation.mutate(
      { id: editingAssignment.id, data: updateData },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setInstructions('');
          setDueDate('');
          setMaxPoints(100);
          setEditingAssignment(null);
          alert('Assignment updated successfully!');
        },
        onError: (error: any) => {
          alert(`Failed to update assignment: ${error.message}`);
        },
      }
    );
  };

  const handleEdit = (assignment: AssignmentOut) => {
    setEditingAssignment(assignment);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setInstructions(assignment.instructions);
    setDueDate(new Date(assignment.dueDate).toISOString().split('T')[0]);
    setMaxPoints(assignment.maxPoints);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingAssignment(null);
    setTitle('');
    setDescription('');
    setInstructions('');
    setDueDate('');
    setMaxPoints(100);
  };

  const handleDelete = (assignmentId: string, assignmentTitle: string) => {
    if (confirm(`Are you sure you want to delete "${assignmentTitle}"? This cannot be undone.`)) {
      deleteMutation.mutate(assignmentId, {
        onSuccess: () => {
          alert('Assignment deleted successfully!');
        },
        onError: (error: any) => {
          alert(`Failed to delete assignment: ${error.message}`);
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-4xl min-w-[700px] max-h-[90vh] overflow-y-auto border-4 border-black shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b-4 border-black p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manage Assignments
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="w-full flex items-center justify-between px-4 py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
            >
              <span className="font-medium">
                {isCreating ? 'Cancel' : '+ Create New Assignment'}
              </span>
              {isCreating && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>

            {isCreating && (
              <form onSubmit={handleCreate} className="mt-4 p-4 border-2 border-black rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Homework 1"
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the assignment"
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Instructions *
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Detailed instructions for students"
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-black rounded"
                      style={{ color: COLORS.primary }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                      Max Points
                    </label>
                    <input
                      type="number"
                      value={maxPoints}
                      onChange={(e) => setMaxPoints(Number(e.target.value))}
                      min="1"
                      className="w-full px-3 py-2 border-2 border-black rounded"
                      style={{ color: COLORS.primary }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createMutation.isPending || !title.trim() || !description.trim() || !instructions.trim() || !dueDate}
                  className="w-full px-4 py-2 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: COLORS.medieval.green }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && title.trim() && description.trim() && instructions.trim() && dueDate) {
                      e.currentTarget.style.backgroundColor = COLORS.medieval.greenHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!createMutation.isPending) {
                      e.currentTarget.style.backgroundColor = COLORS.medieval.green;
                    }
                  }}
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Assignment'}
                </button>
              </form>
            )}
          </div>

          {editingAssignment && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                  Editing: {editingAssignment.title}
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-4 border-2 rounded-lg space-y-4" style={{ borderColor: COLORS.medieval.yellow, backgroundColor: COLORS.medieval.yellowLight }}>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Instructions *
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-black rounded"
                      style={{ color: COLORS.primary }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                      Max Points
                    </label>
                    <input
                      type="number"
                      value={maxPoints}
                      onChange={(e) => setMaxPoints(Number(e.target.value))}
                      min="1"
                      className="w-full px-3 py-2 border-2 border-black rounded"
                      style={{ color: COLORS.primary }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={updateMutation.isPending || !title.trim() || !description.trim() || !instructions.trim() || !dueDate}
                    className="flex-1 px-4 py-2 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: updateMutation.isPending ? COLORS.gray[400] : COLORS.medieval.green }}
                    onMouseEnter={(e) => {
                      if (!updateMutation.isPending && title.trim() && description.trim() && instructions.trim() && dueDate) {
                        e.currentTarget.style.backgroundColor = COLORS.medieval.greenHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!updateMutation.isPending) {
                        e.currentTarget.style.backgroundColor = COLORS.medieval.green;
                      }
                    }}
                  >
                    {updateMutation.isPending ? 'Updating...' : 'Update Assignment'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
              Course Assignments
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  Loading assignments...
                </p>
              </div>
            ) : assignments && assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-start justify-between p-4 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold" style={{ color: COLORS.primary }}>
                        {assignment.title}
                      </h4>
                      <p className="text-sm mt-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{assignment.maxPoints} points</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(assignment)}
                        className="px-3 py-1 text-sm border-2 rounded transition-colors"
                        style={{ borderColor: COLORS.medieval.yellow, color: COLORS.medieval.yellowDark }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.medieval.yellow;
                          e.currentTarget.style.color = COLORS.white;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = COLORS.medieval.yellowDark;
                        }}
                        aria-label={`Edit ${assignment.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(assignment.id, assignment.title)}
                        disabled={deleteMutation.isPending}
                        className="px-3 py-1 text-sm border-2 rounded transition-colors disabled:opacity-50"
                        style={{ borderColor: COLORS.medieval.red, color: COLORS.medieval.red }}
                        onMouseEnter={(e) => {
                          if (!deleteMutation.isPending) {
                            e.currentTarget.style.backgroundColor = COLORS.medieval.red;
                            e.currentTarget.style.color = COLORS.white;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!deleteMutation.isPending) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = COLORS.medieval.red;
                          }
                        }}
                        aria-label={`Delete ${assignment.title}`}
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  No assignments yet. Create your first assignment above!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
