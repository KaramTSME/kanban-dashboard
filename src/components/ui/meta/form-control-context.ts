type TFormControlContext<T = any> = {
  instance: T
  isDirty: boolean
  isDisabled: boolean
  update: (prop: keyof T, value: T[keyof T]) => void
  rollback: () => void
  commit: () => void
  submit: (event?: React.MouseEvent<HTMLElement>) => Promise<any>
}

export type { TFormControlContext }
