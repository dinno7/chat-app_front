<route lang="json5">
{
  name: 'signin',
  meta: {
    justNotAuthUsers: true,
  },
}
</route>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import FormWrapper from '@/components/Form/FormWrapper.vue';
import FormInput from '@/components/Form/Input.vue';
import FullPageCenterWrapper from '@/components/FullPageCenterWrapper.vue';
import $useFetch from '@/composables/$useFetch';
import { useAuthToken } from '@/composables/useAuthToken';
import { useToast } from '@/composables/useToast';
import type { BasePayload, SignAuthPayload } from '@/types';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { $toast } = useToast();
const signInData = reactive({
  email: '',
  password: '',
});
const sendingData = ref(false);
const { setAuthToken } = useAuthToken();

const submitToSignIn = async () => {
  sendingData.value = true;
  const { data, error } = await $useFetch('auth/signin', { credentials: 'include' }, {})
    .post(signInData)
    .json<BasePayload<SignAuthPayload>>();

  if (error.value || !data.value?.ok)
    throw new Error(error.value?.message || 'Some problem happened in signing in');

  const { data: token } = data.value;
  setAuthToken(token.accessToken);

  $toast.success('You were login successfully', {
    title: 'Login successful',
    timeout: 5000,
  });
  sendingData.value = false;

  return router.push({ force: true, replace: true, name: 'home' });
};
</script>

<template>
  <FullPageCenterWrapper>
    <FormWrapper
      class="form-wrapper-width bg-brand-primary/5"
      icon="i-eva:person-outline"
      title="Sign in"
    >
      <form @submit.prevent="submitToSignIn" class="space-y-8">
        <FormInput
          type="text"
          label="Email"
          id="email"
          name="email"
          placeholder="dinno@example.com"
          v-model="signInData.email"
        />
        <FormInput
          type="password"
          label="Password"
          id="password"
          name="password"
          placeholder="Your password"
          v-model="signInData.password"
        />
        <Button styleType="action" :loading="sendingData"> Sign in </Button>
        <p>New user? <RouterLink to="/signup">Sign up</RouterLink></p>
      </form>
    </FormWrapper>
  </FullPageCenterWrapper>
</template>
