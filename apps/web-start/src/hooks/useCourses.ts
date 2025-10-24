import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';

export function useCourses() {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['courses'],
    queryFn: () => api.courses.getAll(),
    enabled: isAuthenticated,
  });
}

export function useCourse(id: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => api.courses.getById(id),
    enabled: !!id && isAuthenticated,
  });
}
