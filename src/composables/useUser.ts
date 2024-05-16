import {
  type BasePayload,
  type SignAuthPayload,
  type SignInData,
  type SignUpData,
  type User,
} from '@/types';
import { normalizeImageUrl } from '@/utils';
import { createGlobalState, tryOnBeforeMount } from '@vueuse/core';
import { computed, ref } from 'vue';
import $useFetch from './$useFetch';

export const useUser = createGlobalState((isFetchBeforeMount: boolean = false) => {
  const currentUser = ref<User | null>(null);
  const isAuth = computed<boolean>(() => !!currentUser.value?.email);
  const profilePicture = computed<string>(() =>
    normalizeImageUrl(currentUser.value?.profilePicture),
  );
  const fetching = ref(false);

  if (isFetchBeforeMount) fetchBeforeMount();

  function fetchBeforeMount() {
    return tryOnBeforeMount(fetchUser);
  }

  function setUser(newUser: User | null) {
    currentUser.value = newUser;
  }

  async function signIn(signInData: SignInData) {
    fetching.value = true;
    const { data, error } = await $useFetch('auth/signin')
      .post(signInData)
      .json<BasePayload<SignAuthPayload>>();
    fetching.value = false;
    if (error.value || !data.value?.ok)
      throw new Error(error.value?.message || 'Some problem happened in signing in');

    const { data: tokens } = data.value;
    setTokens(tokens);

    await fetchUser();

    return currentUser;
  }

  async function signUp(signUpData: SignUpData) {
    fetching.value = true;
    const { data, error } = await $useFetch('auth/signup')
      .post(signUpData)
      .json<BasePayload<SignAuthPayload>>();
    fetching.value = false;
    if (error.value || !data.value?.ok)
      throw new Error(error.value?.message || 'Some problem happend in signing up');

    const { data: tokens } = data.value;
    setTokens(tokens);

    await fetchUser();

    return currentUser;
  }

  async function signout() {
    await $useFetch('auth/signout')
      .post({
        refreshToken: localStorage.getItem('refreshToken') || '',
      })
      .json();

    setUser(null);
    clearTokens();
  }

  async function fetchUser() {
    fetching.value = true;
    const { error, data } = await $useFetch('user/me').json<BasePayload<User>>();
    setUser(error.value || !data.value?.ok ? null : data.value?.data);
    fetching.value = false;
    return currentUser.value;
  }

  function setTokens({ accessToken, refreshToken }: SignAuthPayload) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  function clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
    setTokens,
    clearTokens,
    fetchUser,
    fetchBeforeMount,
  };
});
