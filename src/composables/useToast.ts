import { TOAST_TYPES, type Toast } from '@/types'
import { generateRandUnique } from '@/utils'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useToast = createGlobalState(() => {
  const toasts = ref<Toast[]>([])

  function addToast(
    msg: string,
    options: Partial<Omit<Toast, 'msg' | 'id'> & { timeout: number }> = {}
  ) {
    const id = generateRandUnique(7)
    options.position ||= 'top-right'
    options.type ||= TOAST_TYPES.Info
    options.title ||= ''
    options.timeout ??= 0

    const newToast: Toast = {
      id,
      msg,
      type: options.type,
      title: options.title,
      position: options.position
    }
    toasts.value.push(newToast)

    if (options.timeout) {
      setTimeout(() => {
        deleteToast(id)
      }, options.timeout)
    }
  }
  function deleteToast(id: string) {
    const toastIndex = toasts.value.findIndex((n) => n.id === id)
    if (toastIndex !== -1) toasts.value.splice(toastIndex, 1)
  }

  return {
    toasts,
    addToast,
    deleteToast
  }
})

// > If do not use VueUse:
// const toasts = ref<Toast[]>([])

// function addToast(
//   msg: string,
//   type: TOAST_TYPES,
//   title: string = '',
//   timeout: number | false = false
// ) {
//   const id = generateRandUnique(10)
//   const newToast: Toast = { msg, type, id, title }
//   toasts.value.push(newToast)

//   if (timeout) {
//     setTimeout(() => {
//       deleteToast(id)
//     }, timeout)
//   }
// }
// function deleteToast(id: string) {
//   const toastIndex = toasts.value.findIndex((n) => n.id === id)
//   if (toastIndex !== -1) toasts.value.splice(toastIndex, 1)
// }

// export const useToast = () => ({
//   toasts: toasts.value,
//   addToast,
//   deleteToast
// })
