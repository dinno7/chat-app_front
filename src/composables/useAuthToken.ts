import { useStorage } from '@vueuse/core';

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'accessToken';

export const useAuthToken = () => {
  const authToken = useStorage<string | null>(AUTH_TOKEN_LOCAL_STORAGE_KEY, null, localStorage);
  const setAuthToken = (token: string) => (authToken.value = token);
  const clearAuthToken = () => (authToken.value = null);
  return {
    accessToken: authToken,
    setAuthToken,
    clearAuthToken,
  };
};
