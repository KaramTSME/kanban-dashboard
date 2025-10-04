import { createContext, useCallback, useContext, useState } from "react"
import { SvgIcon } from "./svg-icon"
import { Button } from "./button"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import type { TNullable } from "@/core/types/global"
import type { TCollapsibleListContext } from "@/components/ui/meta/t-collapsible-list-context"
import type { TCollapsibleListProps } from "./meta/collapsible-list"

const CollapsibleListContext = createContext<TNullable<TCollapsibleListContext>>(null)

const CollapsibleListProvider = ({ ...props }) => {
  const [isCollapsed, seIsCollapsed] = useState<boolean>(false)

  const toggle = useCallback((state?: boolean) => seIsCollapsed(state === undefined ? !isCollapsed : state), [isCollapsed])

  const context = { isCollapsed, toggle }

  return <CollapsibleListContext.Provider value={context} {...props} />
}

const CollapsibleList = ({ title, items = [], children, customListItem }: TCollapsibleListProps) => {
  const { isCollapsed, toggle } = useContext(CollapsibleListContext) as TCollapsibleListContext

  const toggleCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <Button
            background={BackgroundEnum.muted}
            size={SizeEnum.lg}
            transparent
            {...{ "list-action": "toggle" }}
            onClick={toggleCollapse}
          >
            <SvgIcon icon="chevron" />
          </Button>
        </div>
      </a>
      {!isCollapsed && (
        <ul className="collapse-list">
          {customListItem}
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
