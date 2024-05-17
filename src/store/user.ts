import $useFetch from '@/composables/$useFetch';
import { useAuthToken } from '@/composables/useAuthToken';
import type { BasePayload, User } from '@/types';
import { normalizeImageUrl } from '@/utils';
import { tryOnBeforeMount } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useSocketConnectionStore } from './socket/connection';

export const useUserStore = defineStore('user', () => {
  const { clearAuthToken } = useAuthToken();
  const socketConnectionStore = useSocketConnectionStore();

  const currentUser = ref<User | null>(null);
  const isAuth = computed<boolean>(() => !!currentUser.value?.email);
  const profilePicture = computed<string>(() =>
    normalizeImageUrl(currentUser.value?.profilePicture),
  );
  const fetching = ref(false);

  function fetchBeforeMount() {
    return tryOnBeforeMount(fetchUser);
  }

  function setUser(newUser: User | null) {
    currentUser.value = newUser;
  }

  async function signout() {
    await $useFetch('auth/signout', { credentials: 'include' }, {}).json();
    socketConnectionStore.disconnect();
    setUser(null);
    clearAuthToken();
  }

  async function fetchUser() {
    fetching.value = true;
    const { error, data } = await $useFetch('user/me').json<BasePayload<User>>();
    setUser(error.value || !data.value?.ok ? null : data.value?.data);
    fetching.value = false;
    return currentUser.value;
  }

  return {
    currentUser,
    isAuth,
    profilePicture,
    isFetching: fetching,
    setUser,
    signout,
    fetchUser,
    fetchBeforeMount,
  };
});
