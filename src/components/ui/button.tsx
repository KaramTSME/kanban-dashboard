import { Button as _Button } from "@/core/defs/button"
import type { IButton } from "@/core/interfaces/i-button"

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & IButton) => {
  const buttonProps = new _Button({ ...props }) as IButton
  return (
    <button {...props} className={`text-${buttonProps.size} bg-${buttonProps.background} ${props.className}`}>
      {children}
    </button>
  )
}

export { Button }
