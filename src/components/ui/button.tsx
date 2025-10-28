import { ats } from "@/core"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { TButton } from "./meta/button"

const Button = ({
  size = SizeEnum.md,
  background = BackgroundEnum.primary,
  disabled = false,
  transparent = false,
  icon = false,
  ...props
}: TButton) => {
  const className = ats([
    "btn",
    `btn-${background}`,
    size,
    `${transparent ? "btn-transparent" : ""}`,
    `${icon ? "btn-icon" : ""}`,
    `${props?.className ? `${props.className}` : ""}`,
  ])

  return (
    <button {...props} disabled={disabled} className={className}>
      {props.children}
    </button>
  )
}

export { Button }
