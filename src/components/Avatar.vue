<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    src: string;
    alt: string;
    title?: string;
  }>(),
  {
    size: 'sm',
    src: '',
    alt: '',
    title: '',
  },
);

const avatarSize = {
  sm: 'size-10 max-w-10 max-h-10',
  md: 'size-14 max-w-14 max-h-14',
  lg: 'size-18 max-w-18 max-h-18',
};
</script>

<template>
  <div
    v-if="props.src"
    class="overflow-hidden rounded-50% bg-brand-base ring-2 ring-brand-action"
    :class="[avatarSize[props.size]]"
    :title="props.title"
  >
    <img :src="props.src" :alt="props.alt" class="size-full object-cover object-c" />
  </div>
</template>
