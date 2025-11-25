import React from "react"
import { isEqual } from "@/core"
import type { TNullable } from "@/core/types/global"
import type { TFormControlProps } from "./meta/form-control"
import type { TFormControlContext } from "./meta/form-control-context"

const FormControlContext = React.createContext<TNullable<TFormControlContext>>(null)

function FormControl<T>({
  instance: inst,
  defaultFormValue = {},
  actionsSlot,
  locked = false,
  onUpdateFire,
  onSettleFire,
  submit: submitFn = () => Promise.resolve(),
  ...props
}: TFormControlProps<T>) {
  const initialInstance = new inst({ ...defaultFormValue })
  const isControlMountedRef = React.useRef(false)
  const hasChanged = React.useRef(false)
  const [isBusy, setIsBusy] = React.useState<boolean>(false)
  const [instance, setInstance] = React.useState<T>(initialInstance)
  const [originalInstance, setOriginalInstance] = React.useState(initialInstance)

  const isDirty = React.useMemo(() => !isEqual(instance, originalInstance), [instance, originalInstance])

  const isDisabled = React.useMemo(() => isBusy || locked, [isBusy, locked])

  const update = React.useCallback((prop: any, value: T[keyof T]) => setInstance({ ...instance, [prop]: value }), [instance])

  const rollback = React.useCallback(() => setInstance({ ...originalInstance }), [originalInstance])

  const commit = React.useCallback(() => setOriginalInstance({ ...instance }), [instance])

  const submit = (event?: React.MouseEvent<HTMLElement>) =>
    new Promise<any>(async (r, x) => {
      try {
        event?.preventDefault?.()
        setIsBusy(true)
        const result = await submitFn(instance)
        r(result)
      } catch (error) {
        x(error)
      } finally {
        setIsBusy(false)
      }
    })

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
    isDisabled,
    update,
    rollback,
    commit,
    submit,
  }

  return (
    <fieldset disabled={isDisabled} className={props.className}>
      <form>
        <FormControlContext.Provider value={context}>
          {props.children}
          {actionsSlot}
        </FormControlContext.Provider>
      </form>
    </fieldset>
  )
}

export { FormControl, FormControlContext }
