<route lang="json5">
{
  name: 'signup',
}
</route>
<script setup>
import Button from '@/components/Button.vue';
import FormWrapper from '@/components/Form/FormWrapper.vue';
import FormInput from '@/components/Form/Input.vue';
import FullPageCenterWrapper from '@/components/FullPageCenterWrapper.vue';
import { useToast } from '@/composables/useToast';
import { useUserStore } from '@/store/user';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const signUpData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const { $toast } = useToast();

const { signUp } = useUserStore();

const router = useRouter();

const sendingData = ref(false);
async function submitSignUp() {
  try {
    sendingData.value = true;
    await signUp(signUpData);
    sendingData.value = false;
    $toast.success('You were signed up successfully', {
      title: 'Sign up successful',
      timeout: 5000,
    });

    return router.push({ force: true, replace: true, name: 'home' });
  } catch (error) {
    $toast.error(error.message, {
      title: 'Sign up failed',
      timeout: 5000,
    });
  }
}
</script>

<template>
  <FullPageCenterWrapper>
    <FormWrapper
      class="form-wrapper-width bg-brand-primary/5"
      icon="i-eva:person-add-outline"
      title="Sign up"
    >
      <form @submit.prevent="submitSignUp" class="space-y-8">
        <FormInput
          type="text"
          label="Name"
          id="name"
          name="name"
          placeholder="Enter your name"
          v-model="signUpData.name"
        />
        <FormInput
          type="text"
          label="Email"
          id="email"
          name="email"
          placeholder="dinno@example.com"
          v-model="signUpData.email"
        />
        <FormInput
          type="password"
          label="Password"
          id="password"
          name="password"
          placeholder="Your password"
          v-model="signUpData.password"
        />
        <FormInput
          type="password"
          label="Confirm password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm your password"
          v-model="signUpData.confirmPassword"
        />
        <Button styleType="action" :loading="sendingData"> Sign up </Button>
        <p>Already have an account? <RouterLink to="/signin">Sign in</RouterLink></p>
      </form>
    </FormWrapper>
  </FullPageCenterWrapper>
</template>
