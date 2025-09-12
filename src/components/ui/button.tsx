import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { IButton } from "@/core/interfaces/i-button"

const Button = ({ size = SizeEnum.md, background = BackgroundEnum.primary, transparent = false, ...props }: IButton) => {
  return (
    <button
      {...props}
      className={`btn btn-${background} ${transparent ? "btn-transparent" : ""} text-${size}${
        props?.className ? ` ${props.className}` : ""
      }`}
    >
      {props.children}
    </button>
  )
}

export { Button }
