import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { TOptional } from "@/core/types/global"

type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: TOptional<SizeEnum>
  background?: TOptional<BackgroundEnum>
  transparent?: TOptional<boolean>
  disabled?: TOptional<boolean>
}

export type { TButton }
