import { BackgroundEnum, SizeEnum } from "../enums/global"
import type { IButton } from "../interfaces/i-button"
import type { TOptional } from "../types/global"

class Button implements IButton {
  size!: TOptional<SizeEnum>
  background!: TOptional<BackgroundEnum>
  transparent!: TOptional<boolean>

  constructor({ size = SizeEnum.md, background = BackgroundEnum.primary, transparent = false }: Partial<IButton>) {
    this.size = size
    this.background = background
    this.transparent = transparent
  }
}

export { Button }
