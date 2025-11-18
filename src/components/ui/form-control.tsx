import React from "react"
import { isEqual } from "@/core"
import type { TNullable } from "@/core/types/global"
import type { TFormControlProps } from "./meta/form-control"
import type { TFormControlContext } from "./meta/form-control-context"

const FormControlContext = React.createContext<TNullable<TFormControlContext>>(null)

function FormControl<T>({ instance: inst, defaultFormValue = {}, onUpdateFire, onSettleFire, ...props }: TFormControlProps<T>) {
  const initialInstance = new inst({ ...defaultFormValue })
  const isControlMountedRef = React.useRef(false)
  const hasChanged = React.useRef(false)
  const [instance, setInstance] = React.useState<T>(initialInstance)
  const [originalInstance, setOriginalInstance] = React.useState(initialInstance)

  const isDirty = React.useMemo(() => !isEqual(instance, originalInstance), [instance, originalInstance])

  const update = React.useCallback((prop: any, value: T[keyof T]) => setInstance({ ...instance, [prop]: value }), [instance])

  const rollback = React.useCallback(() => setInstance({ ...originalInstance }), [originalInstance])

  const commit = React.useCallback(() => setOriginalInstance({ ...instance }), [instance])

  React.useEffect(() => {
    if (!isControlMountedRef.current) {
      isControlMountedRef.current = true
      return
    }
    if (isDirty) {
      hasChanged.current = true
      onUpdateFire?.(instance)
    } else if (hasChanged.current) onSettleFire?.(instance)
  }, [instance, isDirty, onUpdateFire, onSettleFire])

  const context: TFormControlContext = {
    instance,
    isDirty,
    update,
    rollback,
    commit,
  }

  return <FormControlContext.Provider value={context} {...props} />
}

export { FormControl, FormControlContext }
