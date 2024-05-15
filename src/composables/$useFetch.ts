import { createFetch } from '@vueuse/core';
import { useUser } from './useUser';

let requestOptions: RequestInit = {};
const $useFetch = createFetch({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  combination: 'chain',

  options: {
    timeout: 10000,
    updateDataOnError: true,
    beforeFetch(ctx) {
      ctx.options;
      const accessToken = localStorage.getItem('accessToken') || '';
      if (accessToken) {
        ctx.options.headers = {
          ...ctx.options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      requestOptions = ctx.options;
      return ctx;
    },
    async onFetchError(ctx) {
      ctx.error = ctx.data;
      const { setTokens, signout } = useUser();
      const storeRefreshToken = localStorage.getItem('refreshToken') || '';
      const storeAccessToken = localStorage.getItem('accessToken') || '';
      let isRefresh = false;
      if (ctx.response?.status === 401 && storeRefreshToken && !isRefresh) {
        isRefresh = true;

        const getTokens = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: storeRefreshToken,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storeAccessToken}`,
          },
        });

        const newTokens = await getTokens.json();

        if (newTokens?.ok) {
          setTokens(newTokens.data);

          if (ctx.response?.url) {
            await fetch(ctx.response.url, {
              ...requestOptions,
              headers: {
                Authorization: `Bearer ${newTokens?.data?.accessToken || ''}`,
              },
            });
          }
        } else {
          signout();
        }
      }

      isRefresh = false;

      return ctx;
    },
  },
});

export default $useFetch;
