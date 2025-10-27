import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';
import type { AssignmentCreateIn, AssignmentUpdateIn } from '@repo/api';

export function useAssignments(courseId?: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: courseId ? ['assignments', 'course', courseId] : ['assignments'],
    queryFn: async () => {
      const result = await api.assignments.getAll(courseId);
      if (!Array.isArray(result)) {
        console.error('Expected array but got:', result);
        return [];
      }
      return result;
    },
    enabled: isAuthenticated,
  });
}

export function useAssignment(id: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['assignments', id],
    queryFn: () => api.assignments.getById(id),
    enabled: !!id && isAuthenticated,
  });
}

export function useUpcomingAssignments(limit: number = 4) {
  const { data: assignments, ...rest } = useAssignments();

  const assignmentsArray = Array.isArray(assignments) ? assignments : [];

  const upcomingAssignments = assignmentsArray
    .filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      const now = new Date();
      return dueDate > now;
    })
    .sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, limit);

  return {
    data: upcomingAssignments,
    ...rest,
  };
}

export function useCreateAssignment() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignmentCreateIn) => api.assignments.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export function useUpdateAssignment() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssignmentUpdateIn }) =>
      api.assignments.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export function useDeleteAssignment() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.assignments.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}
