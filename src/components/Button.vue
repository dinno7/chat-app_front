<script setup lang="ts">
import { computed } from 'vue';
import Icon from './Icon.vue';

interface IProps {
  styleType?: 'action' | 'primary';
  loading?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  styleType: 'action',
  loading: false,
});
const buttonColor = computed(() =>
  props.styleType === 'action'
    ? 'bg-gradient-to-rt text-brand-base from-[#EC4945] to-[#F68342] border-brand-primary'
    : 'bg-brand-primary/20 text-brand-primary border-brand-action',
);
</script>

<template>
  <button
    class="block flex cursor-pointer items-center justify-center border-2 rounded border-solid px-5 py-2 text-brand-base font-medium font-semibold disabled:(bg-brand-primary/20 from-transparent to-transparent text-brand-primary/80 backdrop-blur hover:brightness-[100%]) focus:(outline-none ring-none) hover:brightness-[130%]"
    :class="[buttonColor]"
    :disabled="props.loading"
  >
    <Icon
      v-if="props.loading"
      name="i-eva:loader-outline"
      color="text-brand-primary"
      class="animate-spin animate-duration-1200"
    />
    <slot v-else />
  </button>
</template>
