import $useFetch from '@/composables/$useFetch';
import { useAuthToken } from '@/composables/useAuthToken';
import type { BasePayload, SignAuthPayload, SignInData, SignUpData, User } from '@/types';
import { normalizeImageUrl } from '@/utils';
import { tryOnBeforeMount } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const { setAuthToken, clearAuthToken } = useAuthToken();

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

  async function signIn(signInData: SignInData) {
    fetching.value = true;
    const { data, error } = await $useFetch('auth/signin', { credentials: 'include' }, {})
      .post(signInData)
      .json<BasePayload<SignAuthPayload>>();
    fetching.value = false;
    if (error.value || !data.value?.ok)
      throw new Error(error.value?.message || 'Some problem happened in signing in');

    const { data: token } = data.value;
    setAuthToken(token.accessToken);

    await fetchUser();

    return currentUser;
  }

  async function signUp(signUpData: SignUpData) {
    fetching.value = true;
    const { data, error } = await $useFetch('auth/signup', { credentials: 'include' }, {})
      .post(signUpData)
      .json<BasePayload<SignAuthPayload>>();
    fetching.value = false;
    if (error.value || !data.value?.ok)
      throw new Error(error.value?.message || 'Some problem happened in signing up');

    const { data: token } = data.value;
    setAuthToken(token.accessToken);

    await fetchUser();

    return currentUser;
  }

  async function signout() {
    await $useFetch('auth/signout', { credentials: 'include' }, {}).json();
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
    signIn,
    signUp,
    fetchUser,
    fetchBeforeMount,
  };
});
