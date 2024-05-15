<script setup lang="ts">
import { generateRandUnique } from '@/utils';

interface IProps {
  label?: string;
}
const props = defineProps<IProps>();
const model = defineModel();
defineOptions({
  inheritAttrs: false,
});

const labelId = generateRandUnique();
</script>

<template>
  <div class="w-full">
    <label v-if="props.label" class="block pb-3 font-bold" :for="labelId">
      {{ props.label }}
    </label>
    <input
      class="block w-full rounded bg-brand-primary/30 px-3 py-2 text-brand-primary caret-brand-base backdrop-blur focus:(border-2 border-brand-action border-solid bg-brand-primary/80 text-brand-base outline-none placeholder-gray-500)"
      :id="labelId"
      v-bind="$attrs"
      v-model="model"
    />
  </div>
</template>
