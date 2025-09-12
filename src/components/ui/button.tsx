import { Button as _Button } from "@/core/defs/button"
import type { IButton } from "@/core/interfaces/i-button"

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & IButton) => {
  const buttonProps = new _Button({ ...props }) as IButton
  return (
    <button
      {...props}
      className={`btn btn-${buttonProps.background} ${buttonProps.transparent ? "btn-transparent" : ""} text-${buttonProps.size}${
        props?.className ? ` ${props.className}` : ""
      }`}
    >
      {children}
    </button>
  )
}

export { Button }
