import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: api.notifications.getAll,
  });
}

export function useNotification(id: string) {
  return useQuery({
    queryKey: ['notifications', id],
    queryFn: () => api.notifications.getById(id),
    enabled: !!id,
  });
}
