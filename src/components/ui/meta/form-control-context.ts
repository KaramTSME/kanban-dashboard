type TFormControlContext<T = any> = {
  instance: T
  isDirty: boolean
  update: (prop: keyof T, value: T[keyof T]) => void
  rollback: () => void
  commit: () => void
}

export type { TFormControlContext }
