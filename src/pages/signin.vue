<route lang="json5">
{
  name: 'signin'
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

const router = useRouter()
const { $toast } = useToast()
const signInData = reactive({
  email: '',
  password: ''
})
const sendingData = ref(false)
const { signIn } = useUser()

const submitToSignIn = async () => {
  try {
    sendingData.value = true
    await signIn(signInData)
    sendingData.value = false
    $toast.success('You were login successfully', {
      title: 'Login successful',
      timeout: 5000
    })

    return router.push({ force: true, replace: true, name: 'home' })
  } catch (error) {
    $toast.error(error.message, {
      title: 'Login failed',
      timeout: 5000
    })
  }
}
</script>

<template>
  <FullPageCenterWrapper>
    <FormWrapper class="form-wrapper-width" icon="i-eva:person-outline" title="Sign in">
      <form @submit.prevent="submitToSignIn" class="w-full space-y-5">
        <FormInput
          type="text"
          lable="Email"
          id="email"
          name="email"
          placeholder="dinno@example.com"
          v-model="signInData.email"
        />
        <FormInput
          type="password"
          lable="Password"
          id="password"
          name="password"
          placeholder="Your password"
          v-model="signInData.password"
        />
        <Button type="action" :loading="sendingData"> Sign in </Button>
        <p>New user? <RouterLink to="/signup">Sign up</RouterLink></p>
      </form>
    </FormWrapper>
  </FullPageCenterWrapper>
</template>
