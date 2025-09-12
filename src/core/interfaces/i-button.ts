import { BackgroundEnum, SizeEnum } from "../enums/global"
import type { TOptional } from "../types/global"

interface IButton {
  size?: TOptional<SizeEnum>
  background?: TOptional<BackgroundEnum>
  transparent?: TOptional<boolean>
}

export type { IButton }
