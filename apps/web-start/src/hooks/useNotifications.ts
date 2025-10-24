import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';

export function useNotifications() {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.notifications.getAll(),
    enabled: isAuthenticated,
  });
}

export function useNotification(id: string) {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['notifications', id],
    queryFn: () => api.notifications.getById(id),
    enabled: !!id && isAuthenticated,
  });
}
