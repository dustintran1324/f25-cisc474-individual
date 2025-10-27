import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useAuthenticatedFetch() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email access:api offline_access',
          },
        });

        const headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };

        return fetch(url, { ...options, headers });
      } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
      }
    },
    [getAccessTokenSilently, isAuthenticated]
  );

  return { authenticatedFetch, isAuthenticated };
}
