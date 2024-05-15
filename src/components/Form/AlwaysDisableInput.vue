<script setup lang="ts">
interface IProps {
  label?: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="w-full">
    <label v-if="props.label" class="block pb-3 font-bold">
      {{ props.label }}
    </label>
    <div
      class="block w-full cursor-not-allowed rounded bg-brand-primary/10 px-3 py-2 text-brand-primary backdrop-blur"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
