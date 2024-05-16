<script setup lang="ts">
import Toast from '@/components/Toast.vue';
import { whenever } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useUser } from './composables/useUser';

const { isAuth } = useUser();
const router = useRouter();
whenever(
  () => !isAuth.value,
  () => router.push({ name: 'signin', force: true, replace: true }),
);
</script>

<template>
  <!-- <Header /> -->
  <main class="mx-auto">
    <RouterView />
  </main>
  <Toast />
</template>
