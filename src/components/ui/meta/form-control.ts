import type React from "react"
import type { TClass } from "@/core/types/global"

type TFormControlProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  instance: TClass
  defaultFormValue?: Partial<T>
}

export type { TFormControlProps }
