import type React from "react"

type TCollapsibleListProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  items: { title: string; url: string }[]
  customListItem?: React.ReactNode
}

export type { TCollapsibleListProps }
