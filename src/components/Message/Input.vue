<script setup lang="ts">
import Icon from '../Icon.vue';
</script>

<template>
  <div class="h-14 min-h-12 flex items-center justify-center gap-3 rounded-lg">
    <input
      name="message"
      id="message"
      dir="auto"
      class="h-full w-4/12 resize-none rounded-lg bg-brand-primary/10 px-3 py-1 backdrop-blur focus:(outline-none)"
    />
    <div
      class="group flex cursor-pointer items-center justify-center rounded-lg bg-brand-primary/10 p-3"
    >
      <Icon
        name="i-eva:navigation-2-outline"
        color="text-brand-primary/70"
        size="28"
        class="group-hover:text-brand-action"
      />
    </div>
  </div>
</template>

<style scoped></style>
