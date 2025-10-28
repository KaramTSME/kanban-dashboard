import type React from "react"

type TCollapsibleListProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  items: { title: string; url: string }[]
  customListItem?: React.ReactNode
  collapseHeadClass?: string
  collapseListClass?: string
}

export type { TCollapsibleListProps }
