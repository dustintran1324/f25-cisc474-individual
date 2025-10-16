import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: api.courses.getAll,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => api.courses.getById(id),
    enabled: !!id,
  });
}
