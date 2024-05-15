<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import { onKeyStroke, useConfirmDialog } from '@vueuse/core';

interface IProps {
  position: 'center' | 'top';
  closeOnOutside: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  position: 'center',
  closeOnOutside: true,
});

const emits = defineEmits<{
  onCancel: [...params: any];
  onConfirm: [...params: any];
  onReveal: [...params: any];
}>();

const positionClasses = {
  top: '-translate-x-1/2 left-1/2 top-5',
  center: '-translate-1/2 left-1/2 top-1/2',
};
const { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel } = useConfirmDialog();

onReveal((...params) => {
  emits('onReveal', ...params);
});
onConfirm((...params) => {
  emits('onConfirm', ...params);
});
onCancel((...params) => {
  emits('onCancel', ...params);
});

onKeyStroke('Escape', () => {
  if (isRevealed.value) {
    cancel();
  }
});

defineExpose({
  isRevealed,
  reveal,
  confirm,
  cancel,
});
</script>

<template>
  <teleport to="body">
    <Transition
      leave-active-class="transition ease-in duration-250"
      leave-from-class="opacity-100"
      leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    >
      <div
        v-if="isRevealed"
        @click="props.closeOnOutside && cancel()"
        class="modal-wrapper fixed inset-0 z-5 animate-fade-in animate-duration-150 bg-brand-primary/10 p-10 backdrop-blur-4"
      ></div>
    </Transition>

    <button
      v-if="isRevealed && props.closeOnOutside"
      class="group fixed right-3 top-3 z-15 bg-transparent p-2"
      @click="cancel"
    >
      <Icon
        name="i-eva:close-outline"
        color="text-brand-primary/70"
        class="group-hover:text-brand-primary"
        size="32"
      />
    </button>
    <Transition
      leave-active-class="transition ease-in duration-250"
      leave-from-class="opacity-100"
      leave-to-class="scale-0 opacity-0 translate-y-100 translate-x-100"
    >
      <div
        v-if="isRevealed"
        class="form-wrapper-width modal-contents fixed z-10 flex animate-zoom-in animate-duration-200 content-center items-center justify-center px-5"
        :class="[positionClasses[props.position]]"
      >
        <slot :cancel="cancel" :confirm="confirm" :reveal="reveal" />
      </div>
    </Transition>
  </teleport>
</template>
