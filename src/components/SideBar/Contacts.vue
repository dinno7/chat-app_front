<script setup lang="ts">
import { useUser } from '@/composables/useUser';

const { currentUser } = useUser();
</script>

<template>
  <div>
    <div class="bg-brand-base/30 p-6">
      <p class="flex items-baseline gap-2 text-xl font-bold">
        <span class="line-clamp-1 text-brand-action tracking-wider">{{ currentUser?.name }}'s</span>
        Messages
      </p>
    </div>
  </div>
</template>
