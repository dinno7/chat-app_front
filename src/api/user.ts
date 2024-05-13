import $useFetch from '@/composables/$useFetch'
import type { BasePayload, User } from '@/types'

export async function getUserFromApi() {
  const { error, data } = await $useFetch('user/me').json<BasePayload<User>>()

  return error.value || !data.value?.ok ? null : data.value?.data
}
