import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';

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
