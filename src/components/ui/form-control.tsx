import { isEqual } from "@/core"
import { createContext, useMemo, useState } from "react"
import type { TNullable } from "@/core/types/global"
import type { TFormControlProps } from "./meta/form-control"
import type { TFormControlContext } from "./meta/form-control-context"

const FormControlContext = createContext<TNullable<TFormControlContext>>(null)

function FormControl<T>({ instance: inst, defaultFormValue = {}, ...props }: TFormControlProps<T>) {
  const [instance, setInstance] = useState<T>(new inst({ ...defaultFormValue }))
  const [originalValue] = useState({ ...instance })

  const isDirty = useMemo(() => !isEqual(instance, originalValue), [instance, originalValue])

  const context: TFormControlContext = {
    instance: instance,
    isDirty,
    setInstance,
  }

  return <FormControlContext.Provider value={context} {...props} />
}

export { FormControl, FormControlContext }
