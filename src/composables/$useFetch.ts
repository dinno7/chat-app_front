import { useUserStore } from '@/store/user';
import { createFetch } from '@vueuse/core';
import { useAuthToken } from './useAuthToken';
import { useToast } from './useToast';

let requestOptions: RequestInit = {};
let isRefresh = false;

const $useFetch = createFetch({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  combination: 'chain',
  options: {
    timeout: 10000,
    updateDataOnError: true,
    beforeFetch(ctx) {
      const { accessToken } = useAuthToken();
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
        isRefresh = true;
        const { $toast } = useToast();
        const { signout } = useUserStore();
        const { setAuthToken } = useAuthToken();

        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, {
            referrer: 'on_fetch_error_401',
            method: 'GET',
            credentials: 'include',
          });
          const newTokens = await res.json();

          if (newTokens?.ok) {
            setAuthToken(newTokens?.data?.accessToken);

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
            $toast.error(
              newTokens?.message || 'Your session has timed out\nplease login in again',
              { timeout: 5000 },
            );
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
