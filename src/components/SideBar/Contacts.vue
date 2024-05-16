<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
</script>

<template>
  <div>
    <div class="bg-brand-base/30 p-6">
      <p class="flex items-baseline gap-2 text-xl font-bold">
        <span class="line-clamp-1 text-brand-action tracking-wider"
          >{{ userStore.currentUser?.name }}'s</span
        >
        Messages
      </p>
    </div>
  </div>
</template>
