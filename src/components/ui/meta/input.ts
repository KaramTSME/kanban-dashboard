import { SizeEnum } from "@/core/enums/global"

type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url"
  label?: string
  noLabel?: boolean
  placeholder?: string
  size?: SizeEnum
}

export type { TInput }
