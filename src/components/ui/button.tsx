import { ats } from "@/core/utils/ats"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { IButton } from "@/core/interfaces/i-button"

const Button = ({ size = SizeEnum.md, background = BackgroundEnum.primary, disabled = false, transparent = false, ...props }: IButton) => {
  const className = ats([
    "btn",
    `btn-${background}`,
    size,
    `${transparent ? "btn-transparent" : ""}`,
    `${props?.className ? `${props.className}` : ""}`,
  ])

  return (
    <button {...props} disabled={disabled} className={className}>
      {props.children}
    </button>
  )
}

export { Button }
