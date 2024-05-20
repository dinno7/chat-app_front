<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    src: string;
    alt: string;
    title?: string;
    status?: 'online' | 'offline' | null;
  }>(),
  {
    size: 'sm',
    src: '',
    alt: '',
    title: '',
    status: null,
  },
);

const avatarSize = {
  sm: 'size-10 max-w-10 max-h-10',
  md: 'size-14 max-w-14 max-h-14',
  lg: 'size-18 max-w-18 max-h-18',
};
</script>

<template>
  <div v-if="props.src" class="relative size-max">
    <div
      class="overflow-hidden rounded-50% bg-brand-base ring-2 ring-brand-action/30"
      :class="[avatarSize[props.size]]"
      :title="props.title"
    >
      <img :src="props.src" :alt="props.alt" class="size-full object-cover object-c" />
    </div>
    <span
      v-if="props.status === 'online'"
      class="absolute size-2.5 rounded-50% bg-green -bottom-0.5 -right-0.5"
    ></span>
  </div>
</template>
