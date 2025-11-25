import { SizeEnum } from "@/core/enums/global"

type TInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  update?: (model: string | number) => void
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url"
  label?: string
  noLabel?: boolean
  placeholder?: string
  disabled?: boolean
  size?: SizeEnum
}

export type { TInput }
