import { createFetch } from '@vueuse/core';
import { useUser } from './useUser';

let requestOptions: RequestInit = {};
let isRefresh = false;

const $useFetch = createFetch({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  combination: 'chain',
  options: {
    timeout: 10000,
    updateDataOnError: true,
    beforeFetch(ctx) {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (accessToken) {
        ctx.options.headers = {
          ...ctx.options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      if (ctx.options.referrer?.toLowerCase() !== 'on_fetch_error_401')
        requestOptions = ctx.options;
      return ctx;
    },
    async onFetchError(ctx) {
      if (ctx.response?.status === 401 && !isRefresh) {
        const storeRefreshToken = localStorage.getItem('refreshToken') || '';
        const storeAccessToken = localStorage.getItem('accessToken') || '';
        isRefresh = true;
        const { signout, setTokens } = useUser();
        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, {
            referrer: 'on_fetch_error_401',
            method: 'POST',
            body: JSON.stringify({
              refreshToken: storeRefreshToken,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storeAccessToken}`,
            },
          });
          const newTokens = await res.json();

          if (newTokens?.ok) {
            setTokens(newTokens.data);

            //> Refetch previous request:
            if (Object.keys(requestOptions).length) {
              try {
                const r = await fetch(ctx.response.url, {
                  ...requestOptions,
                  headers: { Authorization: `Bearer ${newTokens?.data?.accessToken}` },
                });
                const d = await r.json();
                if (!d?.ok) {
                  ctx.data = null;
                  ctx.error = d;
                } else {
                  ctx.data = d;
                  ctx.error = null;
                }
              } catch (error: any) {
                throw Error(error?.message || 'Unexpected');
              }
            }
            // > ----------------------
          } else {
            ctx.data = null;
            ctx.error = newTokens;
            signout();
            return ctx;
          }
        } catch (e) {
          console.error(
            '⭕️ ~ ERROR  ~ in client: src/composables/$useFetch.ts ~> ❗',
            'Unexpected error!',
            e,
          );
        }
      }
      isRefresh = false;
      return ctx;
    },
  },
});

export default $useFetch;
