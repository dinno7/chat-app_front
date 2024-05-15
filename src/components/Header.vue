<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import NavLinks from '@/components/NavLinks.vue';
import { useUser } from '@/composables/useUser';
import UserAvatar from './UserAvatar.vue';
const { currentUser, isAuth } = useUser();
</script>

<template>
  <header class="flex items-center justify-between border-b-2 px-20 py-3">
    <div v-if="isAuth" class="flex items-center justify-start gap-4">
      <UserAvatar />
      <span class="text-lg font-bold">{{ currentUser?.name }}</span>
    </div>
    <div class="flex items-center justify-center">
      <Logo size="70" />
      <p class="text-4xl font-black font-hand">Dinno chat</p>
    </div>
    <NavLinks class="" />
  </header>
</template>
