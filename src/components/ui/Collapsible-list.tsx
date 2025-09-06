import { useState } from "react"
import SvgIcon from "./svg-icon"

const CollapsibleList = ({
  title,
  items = [],
  children,
}: {
  title?: string
  items: { title: string; url: string }[]
  children?: React.ReactNode
}) => {
  const [isCollapsed, seIsCollapsed] = useState<boolean | undefined>()

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    seIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <a href="#" className="collapsible" {...{ open: !isCollapsed }}>
        <h6 className="collapsible-title">{title}</h6>
        <div>
          {children}
          <button className="collapsible-action" onClick={toggle}>
            <SvgIcon icon="chevron" />
          </button>
        </div>
      </a>
      {!isCollapsed && (
        <ul className="collapse-list">
          {items.map((item, index) => {
            return (
              <li className="collapse-list-item" key={index}>
                <a href={item.url || "#"} className="collapse-list-item-content">
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
export default CollapsibleList
