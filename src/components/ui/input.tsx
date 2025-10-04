import { ats } from "@/core/utils/ats"
import { SizeEnum } from "@/core/enums/global"
import type { TInput } from "./meta/input"

const Input = ({ type = "text", label, noLabel, placeholder, id, size = SizeEnum.md, ...props }: TInput) => {
  const className = ats([size, `${props.className ? `${props.className}` : ""}`])

  return (
    <div className={className}>
      {!noLabel && (
        <label htmlFor={id} className={ats(["inline-block", "mb-1", size])}>
          {label}
          {props.required && (
            <span className="tip text-orange-400" aria-label="required field">
              &nbsp;*
            </span>
          )}
        </label>
      )}
      <input type={type} placeholder={placeholder} id={id} />
    </div>
  )
}

export { Input }
