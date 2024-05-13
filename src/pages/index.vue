<script setup lang="ts">
import { useUser } from '@/composables/useUser'

const { currentUser, isAuth } = useUser()
</script>
<template>
  {{ isAuth ? currentUser!.email : 'You are not logged in' }}
  <h1>This is an Home page</h1>
</template>
