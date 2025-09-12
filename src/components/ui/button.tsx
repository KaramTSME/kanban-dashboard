import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { IButton } from "@/core/interfaces/i-button"

const Button = ({ size = SizeEnum.md, background = BackgroundEnum.primary, disabled = false, transparent = false, ...props }: IButton) => {
  const className = `btn btn-${background} ${transparent ? "btn-transparent" : ""} text-${size}${
    props?.className ? ` ${props.className}` : ""
  }`
  return (
    <button {...props} disabled={disabled} className={className}>
      {props.children}
    </button>
  )
}

export { Button }
