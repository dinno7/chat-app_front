export type ToastPositionType =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export enum TOAST_TYPES {
  Success = 'TOAST_SUCCESS',
  Error = 'TOAST_ERROR',
  Info = 'TOAST_INFO'
}
export interface Toast {
  id: string
  msg: string
  title?: string
  type: TOAST_TYPES
  position: ToastPositionType
}
