<route lang="json5">
{
  name: 'signup'
}
</route>
<script setup>
import Button from '@/components/Button.vue'
import FormWrapper from '@/components/Form/FormWrapper.vue'
import FormInput from '@/components/Form/Input.vue'
import { useToast } from '@/composables/useToast'
import { useUser } from '@/composables/useUser'
import { TOAST_TYPES } from '@/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const signUpData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const { addToast } = useToast()
const { signUp } = useUser()
const router = useRouter()

const sendingData = ref(false)
async function submitSignUp() {
  try {
    sendingData.value = true
    await signUp(signUpData)
    sendingData.value = false
    addToast('You were signed up successfully', {
      type: TOAST_TYPES.Success,
      title: 'Sign up successfull',
      timeout: 5000
    })

    return router.push({ force: true, replace: true, name: 'home' })
  } catch (error) {
    addToast(error.message, {
      type: TOAST_TYPES.Error,
      title: 'Sign up faild',
      timeout: 5000
    })
  }
}
</script>

<template>
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
</template>
