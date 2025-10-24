import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './useApi';

export function useCurrentUser() {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => api.users.getMe(),
    enabled: isAuthenticated,
    staleTime: Infinity,
  });
}
