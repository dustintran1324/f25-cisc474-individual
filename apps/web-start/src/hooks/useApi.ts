import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { createApiClient } from '../lib/api';

export function useApi() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const api = useMemo(() => {
    return new Proxy(createApiClient(), {
      get(target, resourceName: string) {
        const resource = target[resourceName as keyof typeof target];
        if (!resource || typeof resource !== 'object') {
          return resource;
        }

        return new Proxy(resource, {
          get(methods, methodName: string) {
            const method = methods[methodName as keyof typeof methods];
            if (typeof method !== 'function') {
              return method;
            }

            return async (...args: any[]) => {
              let token: string | undefined;

              if (isAuthenticated) {
                try {
                  token = await getAccessTokenSilently({
                    authorizationParams: {
                      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                      scope: 'openid profile email access:api',
                    },
                  });
                } catch (error) {
                  console.error('Error getting access token:', error);
                }
              }

              const authenticatedClient = createApiClient(token);
              const authenticatedResource = authenticatedClient[resourceName as keyof typeof authenticatedClient];
              const authenticatedMethod = (authenticatedResource as any)[methodName];
              return authenticatedMethod(...args);
            };
          },
        });
      },
    }) as ReturnType<typeof createApiClient>;
  }, [getAccessTokenSilently, isAuthenticated]);

  return { api, isAuthenticated };
}
