<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import { TOAST_TYPES } from '@/types';
import { computed } from 'vue';
import Icon from './Icon.vue';

const { $toast, toasts } = useToast();

type ToastOptionsType = {
  colorClasses: string;
  icon: string;
  iconColorClasses: string;
  animateClass: string;
};
const toastsOptions = computed(() => {
  const options: Record<string, ToastOptionsType> = {};

  toasts.value.forEach((t) => {
    let option: ToastOptionsType;
    switch (t.type) {
      case TOAST_TYPES.Success:
        option = {
          colorClasses: 'bg-emerald-900/45 border-emerald-500/50',
          icon: 'i-eva:checkmark-circle-2-outline',
          iconColorClasses: 'text-emerald-400',
          animateClass: 'animate-tada',
        };
        break;
      case TOAST_TYPES.Error:
        option = {
          colorClasses: 'bg-rose-900/45 border-rose-500/50',
          icon: 'i-eva:alert-triangle-outline',
          iconColorClasses: 'text-rose-400',
          animateClass: 'animate-head-shake',
        };
        break;

      default:
        option = {
          colorClasses: 'bg-sky-900/45 border-sky-500/50',
          icon: 'i-eva:question-mark-outline',
          iconColorClasses: 'text-sky-400',
          animateClass: 'animate-fade-in-down animate-duration-200',
        };
        break;
    }

    options[t.id] = option;
  });
  return options;
});
</script>

<template>
  <!-- Global toast live region, render this permanently at the end of the document -->
  <Teleport to="body">
    <div
      aria-live="assertive"
      class="Toast pointer-events-none fixed right-1/2 z-50 flex translate-x-1/2 transform items-end px-4 py-6 -top-4 md:translate-x-0 sm:items-start sm:p-6 md:-right-2"
    >
      <div class="w-full flex flex-col items-center sm:items-end space-y-4">
        <!-- Toast panel, dynamically insert this into the live region when it needs to be displayed -->
        <!-- <transition-group
          enter-active-class="transition duration-500 ease-in-out transform"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-ins duration-250"
          leave-from-class="opacity-100"
          move-class="absolute"
          leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        > -->
        <transition-group
          leave-active-class="transition ease-in duration-250"
          leave-from-class="opacity-100"
          move-class="absolute"
          leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        >
          <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="[toastsOptions[toast.id].animateClass]"
          >
            <div
              :class="[toastsOptions[toast.id].colorClasses]"
              class="toast-card pointer-events-auto max-w-sm w-80 overflow-hidden border-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg transition-duration-300 transition-ease transition-property-[backdrop-filter] hover:(backdrop-blur-xl)"
            >
              <div class="p-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0">
                    <Icon
                      :name="toastsOptions[toast.id].icon"
                      :class="[toastsOptions[toast.id].iconColorClasses]"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mr-3 w-0 flex-1 pt-0.5">
                    <p v-if="toast.title" class="mb-1 text-gray-50 font-medium">
                      {{ toast.title }}
                    </p>
                  </div>
                  <div class="flex flex-shrink-0">
                    <button
                      type="button"
                      @click="() => $toast.remove(toast.id)"
                      class="inline-flex rounded-md bg-transparent text-gray-300 hover:text-gray-500 focus:outline-none"
                    >
                      <span class="sr-only">Close</span>
                      <Icon
                        name="i-eva:close-fill"
                        size="20"
                        color="text-gray-100 hover:text-blue-300"
                      />
                    </button>
                  </div>
                </div>
                <div class="pl-3 pr-5">
                  <p class="break-words text-gray-300">{{ toast.msg }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Teleport>
</template>
