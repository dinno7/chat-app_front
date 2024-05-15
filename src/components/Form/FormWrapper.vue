<script setup lang="ts">
import Icon from '@/components/Icon.vue';
const props = defineProps<{
  icon?: string;
  title?: string;
}>();
</script>

<template>
  <div
    class="mx-auto flex flex-col items-center justify-center rounded-lg bg-brand-base px-5 py-10"
  >
    <div
      v-if="props.icon"
      class="aspect-ratio-square w-24 flex items-center justify-center rounded-full bg-brand-primary/10"
    >
      <Icon :name="props.icon" color="text-brand-action" size="75" />
    </div>
    <p v-if="props.title" class="my-5 text-3xl font-bold tracking-wider">
      {{ props.title }}
    </p>

    <div class="w-full">
      <slot> Your form... </slot>
    </div>
  </div>
</template>
