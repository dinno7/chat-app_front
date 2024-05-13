<script setup lang="ts">
import { useUser } from '@/composables/useUser'

const { isAuth, currentUser, profilePicture } = useUser()
</script>

<template>
  <div
    v-if="isAuth"
    class="overflow-hidden rounded-full w-9 aspect-ratio-square bg-brand-base ring-2 ring-brand-action"
    :title="currentUser?.name"
  >
    <img
      :src="profilePicture"
      :alt="currentUser?.name + ' profile image'"
      class="object-cover w-full h-full object-c"
    />
  </div>
</template>

<style scoped></style>
