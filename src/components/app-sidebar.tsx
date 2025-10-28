import React from "react"
import { Command } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CollapsibleList, CollapsibleListProvider } from "./ui/collapsible-list"
import { SvgIcon } from "./ui/svg-icon"
import { Button } from "./ui/button"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import { Input } from "./ui/input"

const AddNewButton = ({
  disabled,
  toggleNewBoardForm,
}: {
  disabled: boolean
  toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>, c: boolean) => void
}) => {
  const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleNewBoardForm(e, true)
  }

  return (
    <Button
      background={BackgroundEnum.muted}
      className="tip mr-1"
      disabled={disabled}
      size={SizeEnum.lg}
      transparent
      icon
      {...{ "aria-label": "Create" }}
      onClick={onAdd}
    >
      <SvgIcon icon="plus" />
    </Button>
  )
}

const InputForm = ({ toggleNewBoardForm }: { toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  return (
    <div className="ml-3 mb-3">
      <Input className="mb-2" label="Dashboard name" placeholder="Enter dashboard name" size={SizeEnum.xs} required />
      <div className="flex justify-end gap-2">
        <Button background={BackgroundEnum.secondary} size={SizeEnum.xs} onClick={toggleNewBoardForm}>
          Cancel
        </Button>
        <Button background={BackgroundEnum.primary} size={SizeEnum.xs}>
          Create
        </Button>
      </div>
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [newBoardFormVisible, setNewBoardFormVisible] = React.useState(false)
  const toggleNewBoardForm = (e: React.MouseEvent<HTMLButtonElement>, c = false) => {
    e.preventDefault()
    e.stopPropagation()
    setNewBoardFormVisible(c)
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <CollapsibleListProvider>
        <CollapsibleList
          title="My Dashboards"
          items={[
            { title: "Dashboard 1", url: "#" },
            { title: "Dashboard 2", url: "#" },
          ]}
          customListItem={newBoardFormVisible && <InputForm toggleNewBoardForm={toggleNewBoardForm} />}
        >
          <AddNewButton disabled={newBoardFormVisible} toggleNewBoardForm={toggleNewBoardForm} />
        </CollapsibleList>
      </CollapsibleListProvider>
    </Sidebar>
  )
}
