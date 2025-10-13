import { SizeEnum } from "@/core/enums/global"

type TInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url"
  label?: string
  noLabel?: boolean
  placeholder?: string
  size?: SizeEnum
}

export type { TInput }
