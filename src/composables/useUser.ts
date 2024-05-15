import { getUserFromApi } from '@/api/user';
import {
  type BasePayload,
  type SignAuthPayload,
  type SignInData,
  type SignUpData,
  type User,
} from '@/types';
import { createGlobalState, tryOnBeforeMount } from '@vueuse/core';
import { computed, ref } from 'vue';
import $useFetch from './$useFetch';

export const useUser = createGlobalState(() => {
  const currentUser = ref<User | null>(null);
  const isAuth = computed<boolean>(() => !!currentUser.value?.email);
  const profilePicture = computed<string>(() =>
    currentUser.value?.profilePicture.startsWith('https://')
      ? currentUser.value.profilePicture
      : `${import.meta.env.VITE_SERVER_URL}${currentUser.value?.profilePicture}`,
  );
  const fetching = ref(false);

  tryOnBeforeMount(fetchUser);
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
    const fetchedUser = await getUserFromApi();
    setUser(fetchedUser);
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
  };
});
