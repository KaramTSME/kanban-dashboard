import { BackgroundEnum, SizeEnum } from "../enums/global"
import type { IButton } from "../interfaces/i-button"
import type { TOptional } from "../types/global"

class Button implements IButton {
  size?: TOptional<SizeEnum>
  background?: TOptional<BackgroundEnum>

  constructor({ size = SizeEnum.md, background = BackgroundEnum.primary }: Partial<IButton>) {
    this.size = size
    this.background = background
  }
}

export { Button }
