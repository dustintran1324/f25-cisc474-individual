import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';
import type { SubmissionCreateIn, SubmissionUpdateIn, SubmissionOut } from '@repo/api';

/**
 * Fetch all submissions, optionally filtered by userId and/or assignmentId
 */
export function useSubmissions(userId?: string, assignmentId?: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  const queryKey = ['submissions'];
  if (userId) queryKey.push('user', userId);
  if (assignmentId) queryKey.push('assignment', assignmentId);

  return useQuery<SubmissionOut[]>({
    queryKey,
    queryFn: async () => {
      const result = await api.submissions.getAll(userId, assignmentId);
      if (!Array.isArray(result)) {
        console.error('Expected array but got:', result);
        return [];
      }
      return result;
    },
    enabled: isAuthenticated,
  });
}

/**
 * Fetch a single submission by ID
 */
export function useSubmission(id: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery<SubmissionOut>({
    queryKey: ['submissions', id],
    queryFn: () => api.submissions.getById(id),
    enabled: !!id && isAuthenticated,
  });
}

/**
 * Fetch a submission for a specific user and assignment
 * Backend returns a single submission object (not array) when both params provided
 */
export function useSubmissionByUserAndAssignment(userId: string | undefined, assignmentId: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['submissions', 'user', userId, 'assignment', assignmentId],
    queryFn: async (): Promise<SubmissionOut | null> => {
      if (!userId) return null;
      const result = await api.submissions.getAll(userId, assignmentId);
      // Backend returns single object when both userId and assignmentId provided
      if (result && !Array.isArray(result)) {
        return result as SubmissionOut;
      }
      // Fallback: if array returned, take first element
      return Array.isArray(result) && result.length > 0 ? (result[0] ?? null) : null;
    },
    enabled: !!userId && !!assignmentId && isAuthenticated,
  });
}

/**
 * Create a new submission
 */
export function useCreateSubmission() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmissionCreateIn) => api.submissions.create(data),
    onSuccess: (newSubmission) => {
      // Invalidate all submissions queries to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

/**
 * Update an existing submission
 */
export function useUpdateSubmission() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmissionUpdateIn }) =>
      api.submissions.update(id, data),
    onSuccess: (updatedSubmission) => {
      // Invalidate all submissions queries to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

/**
 * Submit a submission (change status from DRAFT to SUBMITTED)
 */
export function useSubmitSubmission() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.submissions.submit(id),
    onSuccess: () => {
      // Invalidate all submissions queries to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

/**
 * Delete a submission
 */
export function useDeleteSubmission() {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.submissions.delete(id),
    onSuccess: () => {
      // Invalidate all submissions queries to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}
