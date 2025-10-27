import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../hooks/useApi';
import { COLORS, OPACITY } from '../../constants/theme';
import type { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api';

interface ManageCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManageCoursesModal({ isOpen, onClose }: ManageCoursesModalProps) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseOut | null>(null);

  const { data: courses, isLoading } = useCourses();
  const { data: currentUser } = useCurrentUser();
  const { api } = useApi();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CourseCreateIn) => api.courses.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setTitle('');
      setCode('');
      setDescription('');
      setIsCreating(false);
      alert('Course created successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to create course: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseUpdateIn }) =>
      api.courses.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setTitle('');
      setCode('');
      setDescription('');
      setEditingCourse(null);
      alert('Course updated successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to update course: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.courses.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      alert('Course deleted successfully!');
    },
    onError: (error: any) => {
      alert(`Failed to delete course: ${error.message}`);
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id) {
      alert('User not found. Please log in again.');
      return;
    }

    createMutation.mutate({
      title,
      code,
      description: description.trim() || null,
      instructorId: currentUser.id,
      isActive: true,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    updateMutation.mutate({
      id: editingCourse.id,
      data: {
        title,
        code,
        description: description.trim() || null,
      },
    });
  };

  const handleEdit = (course: CourseOut) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCode(course.code);
    setDescription(course.description || '');
    setIsCreating(false); // Close create form if open
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setTitle('');
    setCode('');
    setDescription('');
  };

  const handleDelete = (courseId: string, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete "${courseTitle}"? This cannot be undone.`)) {
      deleteMutation.mutate(courseId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-3xl min-w-[600px] max-h-[90vh] overflow-y-auto border-4 border-black shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b-4 border-black p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manage Courses
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Create New Course Section */}
          <div className="mb-8">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="w-full flex items-center justify-between px-4 py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="font-medium">
                {isCreating ? 'Cancel' : '+ Create New Course'}
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
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Introduction to Web Development"
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Course Code *
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g., CS474"
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                  <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
                    Must be unique
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the course (optional)"
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={createMutation.isPending || !title.trim() || !code.trim()}
                  className="w-full px-4 py-2 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: COLORS.medieval.green }}
                  onMouseEnter={(e) => {
                    if (!createMutation.isPending && title.trim() && code.trim()) {
                      e.currentTarget.style.backgroundColor = COLORS.medieval.greenHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!createMutation.isPending) {
                      e.currentTarget.style.backgroundColor = COLORS.medieval.green;
                    }
                  }}
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Course'}
                </button>
              </form>
            )}
          </div>

          {/* Edit Course Section */}
          {editingCourse && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                  Editing: {editingCourse.title}
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-4 border-2 rounded-lg space-y-4" style={{ borderColor: COLORS.medieval.yellow, backgroundColor: COLORS.medieval.yellowLight }}>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Introduction to Web Development"
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Course Code *
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g., CS474"
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                    required
                  />
                  <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
                    Must be unique
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the course (optional)"
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-black rounded"
                    style={{ color: COLORS.primary }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={updateMutation.isPending || !title.trim() || !code.trim()}
                    className="flex-1 px-4 py-2 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ backgroundColor: updateMutation.isPending ? COLORS.gray[400] : COLORS.medieval.green }}
                    onMouseEnter={(e) => {
                      if (!updateMutation.isPending && title.trim() && code.trim()) {
                        e.currentTarget.style.backgroundColor = COLORS.medieval.greenHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!updateMutation.isPending) {
                        e.currentTarget.style.backgroundColor = COLORS.medieval.green;
                      }
                    }}
                  >
                    {updateMutation.isPending ? 'Updating...' : 'Update Course'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Existing Courses List */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
              Your Courses
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  Loading courses...
                </p>
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold" style={{ color: COLORS.primary }}>
                        {course.code} - {course.title}
                      </h4>
                      {course.description && (
                        <p className="text-sm mt-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                          {course.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(course)}
                        className="px-3 py-1 text-sm border-2 rounded transition-colors cursor-pointer"
                        style={{ borderColor: COLORS.medieval.yellow, color: COLORS.medieval.yellowDark }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.medieval.yellow;
                          e.currentTarget.style.color = COLORS.white;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = COLORS.medieval.yellowDark;
                        }}
                        aria-label={`Edit ${course.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id, course.title)}
                        disabled={deleteMutation.isPending}
                        className="px-3 py-1 text-sm border-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
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
                        aria-label={`Delete ${course.title}`}
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
                  No courses yet. Create your first course above!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
