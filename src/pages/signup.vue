<route lang="json5">
{
  name: 'signup'
}
</route>
<script setup>
import Button from '@/components/Button.vue'
import FormWrapper from '@/components/Form/FormWrapper.vue'
import FormInput from '@/components/Form/Input.vue'
import FullPageCenterWrapper from '@/components/FullPageCenterWrapper.vue'
import { useToast } from '@/composables/useToast'
import { useUser } from '@/composables/useUser'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const signUpData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const { $toast } = useToast()
const { signUp } = useUser()
const router = useRouter()

const sendingData = ref(false)
async function submitSignUp() {
  try {
    sendingData.value = true
    await signUp(signUpData)
    sendingData.value = false
    $toast.success('You were signed up successfully', {
      title: 'Sign up successful',
      timeout: 5000
    })

    return router.push({ force: true, replace: true, name: 'home' })
  } catch (error) {
    $toast.error(error.message, {
      title: 'Sign up failed',
      timeout: 5000
    })
  }
}
</script>

<template>
  <FullPageCenterWrapper>
    <FormWrapper class="form-wrapper-width" icon="i-eva:person-add-outline" title="Sign up">
      <form @submit.prevent="submitSignUp" class="w-full space-y-5">
        <FormInput
          type="text"
          lable="Name"
          id="name"
          name="name"
          placeholder="Enter your name"
          v-model="signUpData.name"
        />
        <FormInput
          type="text"
          lable="Email"
          id="email"
          name="email"
          placeholder="dinno@example.com"
          v-model="signUpData.email"
        />
        <FormInput
          type="password"
          lable="Password"
          id="password"
          name="password"
          placeholder="Your password"
          v-model="signUpData.password"
        />
        <FormInput
          type="password"
          lable="Confirm password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm your password"
          v-model="signUpData.confirmPassword"
        />
        <Button type="action" :loading="sendingData"> Sign up </Button>
        <p>Already have an account? <RouterLink to="/signin">Sign in</RouterLink></p>
      </form>
    </FormWrapper>
  </FullPageCenterWrapper>
</template>
