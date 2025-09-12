import { createContext, useCallback, useContext, useState, type MouseEvent, type ReactNode } from "react"
import { SvgIcon } from "./svg-icon"
import { Button } from "./button"
import type { TNullable } from "@/core/types/global"
import type { TCollapsibleListContext } from "@/core/types/t-collapsible-list-context"
import { BackgroundEnum } from "@/core/enums/global"

const CollapsibleListContext = createContext<TNullable<TCollapsibleListContext>>(null)

const CollapsibleListProvider = ({ ...props }) => {
  const [isCollapsed, seIsCollapsed] = useState<boolean>(false)

  const toggle = useCallback((state?: boolean) => seIsCollapsed(state === undefined ? !isCollapsed : state), [isCollapsed])

  const context = { isCollapsed, toggle }

  return <CollapsibleListContext.Provider value={context} {...props} />
}

const CollapsibleList = ({
  title,
  items = [],
  children,
}: {
  title?: string
  items: { title: string; url: string }[]
  children?: ReactNode
}) => {
  const { isCollapsed, toggle } = useContext(CollapsibleListContext) as TCollapsibleListContext

  const toggleCollapse = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
  }

  // Children.map(children, (child) => (isValidElement(child) ? cloneElement(child, { onClick: () => toggle }) : child))

  return (
    <>
      <a href="#" className="collapsible" {...{ open: !isCollapsed }}>
        <h6 className="collapsible-title">{title}</h6>
        <div>
          {children}
          <Button background={BackgroundEnum.muted} transparent {...{ "list-action": "toggle" }} onClick={toggleCollapse}>
            <SvgIcon icon="chevron" />
          </Button>
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
export { CollapsibleListContext, CollapsibleList, CollapsibleListProvider }
