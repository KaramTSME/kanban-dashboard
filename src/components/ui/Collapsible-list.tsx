import { useState } from "react"

const collapseButtonClassList = `peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm`
const ulClassList = `mx-3.5 flex min-w-0 translate-x-px flex-col gap-1  px-2.5 py-0.5 group-data-[collapsible=icon]:hidden`
const anchorClassList = `text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sm group-data-[collapsible=icon]:hidden`

const CollapsibleList = ({ items = [] }: { items: { title: string; url: string }[] }) => {
  const [isCollapsed, seIsCollapsed] = useState<boolean | undefined>()
  return (
    <>
      <button className={collapseButtonClassList} onClick={() => seIsCollapsed(!isCollapsed)}>
        Collapse
      </button>
      <div className="mt-1">
        {!isCollapsed && (
          <ul className={ulClassList}>
            {items.map((item, index) => {
              return (
                <li className="group/menu-sub-item relative" key={index}>
                  <a href={item.url || "#"} className={anchorClassList}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
export default CollapsibleList
