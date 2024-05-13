<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { TOAST_TYPES } from '@/types'
import { computed } from 'vue'
import Icon from './Icon.vue'

const { $toast, toasts } = useToast()

type ToastOptionsType = {
  colorClasses: string
  icon: string
  iconColorClasses: string
  animateClass: string
}
const toastsOptions = computed(() => {
  const options: Record<string, ToastOptionsType> = {}

  toasts.value.forEach((t) => {
    let option: ToastOptionsType
    switch (t.type) {
      case TOAST_TYPES.Success:
        option = {
          colorClasses: 'bg-emerald-900/10 border-emerald-500/50',
          icon: 'i-eva:checkmark-circle-2-outline',
          iconColorClasses: 'text-emerald-400',
          animateClass: 'animate-tada'
        }
        break
      case TOAST_TYPES.Error:
        option = {
          colorClasses: 'bg-rose-900/10 border-rose-500/50',
          icon: 'i-eva:alert-triangle-outline',
          iconColorClasses: 'text-rose-400',
          animateClass: 'animate-shake-x'
        }
        break

      default:
        option = {
          colorClasses: 'bg-sky-900/10 border-sky-500/50',
          icon: 'i-eva:question-mark-outline',
          iconColorClasses: 'text-sky-400',
          animateClass: 'animate-fade-in-down animate-duration-200'
        }
        break
    }

    options[t.id] = option
  })
  return options
})
</script>

<template>
  <!-- Global toast live region, render this permanently at the end of the document -->
  <Teleport to="body">
    <div
      aria-live="assertive"
      class="fixed z-50 flex items-end px-4 py-6 transform translate-x-1/2 pointer-events-none Toast right-1/2 -top-4 md:translate-x-0 md:-right-2 sm:items-start sm:p-6"
    >
      <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
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
          leave-active-class="transition ease-ins duration-250"
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
              class="toast-card max-w-sm overflow-hidden border-2 rounded-lg shadow-lg pointer-events-auto w-80 backdrop-blur transition-property-[backdrop-filter] transition-ease transition-duration-300 hover:(backdrop-blur-xl) ring-1 ring-black ring-opacity-5"
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
                    <p v-if="toast.title" class="mb-1 font-medium text-gray-50">
                      {{ toast.title }}
                    </p>
                  </div>
                  <div class="flex flex-shrink-0">
                    <button
                      type="button"
                      @click="() => $toast.remove(toast.id)"
                      class="inline-flex text-gray-300 bg-transparent rounded-md hover:text-gray-500 focus:outline-none"
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
                  <p class="text-gray-300 break-words">{{ toast.msg }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Teleport>
</template>
