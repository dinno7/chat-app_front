<script setup lang="ts">
import Icon from '@/components/Icon.vue'
const props = defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-5 py-10 mx-auto rounded-lg bg-brand-primary/10 backdrop-blur-md"
  >
    <div
      v-if="props.icon"
      class="flex items-center justify-center w-24 rounded-full aspect-ratio-square bg-brand-primary/10"
    >
      <Icon :name="props.icon" color="text-brand-action" size="75" />
    </div>
    <p v-if="props.title" class="my-5 text-3xl font-bold tracking-wider">
      {{ props.title }}
    </p>

    <slot> Your form... </slot>
  </div>
</template>
