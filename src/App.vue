<script setup lang="ts">
import Toast from '@/components/Toast.vue';
import { whenever } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/user';

const userStore = useUserStore();
const router = useRouter();
whenever(
  () => !userStore.isAuth,
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
