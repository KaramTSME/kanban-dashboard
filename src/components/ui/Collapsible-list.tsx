import Chevron from "@/assets/svg/chevron"
import { useState } from "react"

const CollapsibleList = ({ title, items = [] }: { title?: string; items: { title: string; url: string }[] }) => {
  const [isCollapsed, seIsCollapsed] = useState<boolean | undefined>()
  return (
    <>
      <div className="collapsible" {...{ open: !isCollapsed }}>
        <h6 className="collapsible-title">{title}</h6>
        <button className="collapsible-chevron" onClick={() => seIsCollapsed(!isCollapsed)}>
          <Chevron />
        </button>
      </div>
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
