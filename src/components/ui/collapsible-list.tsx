import { ats } from "@/core"
import { Button } from "./button"
import { SvgIcon } from "./svg-icon"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import { createContext, useCallback, useContext, useState } from "react"
import type { TNullable } from "@/core/types/global"
import type { TCollapsibleListContext } from "@/components/ui/meta/collapsible-list-context"
import type { TCollapsibleListProps } from "./meta/collapsible-list"

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
  customListItem,
  collapseHeadClass = "",
  collapseListClass = "",
}: TCollapsibleListProps) => {
  const { isCollapsed, toggle } = useContext(CollapsibleListContext) as TCollapsibleListContext

  const toggleCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
  }

  return (
    <>
      <a href="#" className={ats(["collapsible", collapseHeadClass])} {...{ open: !isCollapsed }}>
        <h6 className="collapsible-title">{title}</h6>
        <div>
          {children}
          <Button background={BackgroundEnum.muted} size={SizeEnum.lg} list-action="toggle" transparent icon onClick={toggleCollapse}>
            <SvgIcon icon="chevron" />
          </Button>
        </div>
      </a>
      {!isCollapsed && (
        <ul className={ats(["collapse-list", collapseListClass])}>
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
