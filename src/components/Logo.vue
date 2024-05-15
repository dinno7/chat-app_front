<script setup lang="ts">
interface IProps {
  size?: number | string;
  hasText?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 74,
  hasText: false,
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div :style="{ width: props.size + 'px' }" class="aspect-ratio">
      <img class="h-full w-full" src="@/assets/logo.png" alt="Dinno chat logo" />
    </div>
    <p
      v-if="hasText"
      class="font-black font-hand"
      :style="{ fontSize: parseFloat(props.size + '') / 3 + 'px' }"
    >
      Dinno chat
    </p>
  </div>
</template>
