import React, { useContext } from "react"
import { Command } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CollapsibleList, CollapsibleListContext, CollapsibleListProvider } from "./ui/collapsible-list"
import { SvgIcon } from "./ui/svg-icon"
import { Button } from "./ui/button"
import { BackgroundEnum, SizeEnum } from "@/core/enums/global"
import { Input } from "./ui/input"
import { FormControlContext, FormControl } from "./ui/form-control"
import { Name } from "@/core/defs/name"
import type { TFormControlContext } from "./ui/meta/form-control-context"
import type { IName } from "@/core/interfaces/i-name"
import type { TCollapsibleListContext } from "./ui/meta/collapsible-list-context"

const AddNewButton = ({
  disabled,
  toggleNewBoardForm,
}: {
  disabled: boolean
  toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>, c: boolean) => void
}) => {
  const { isCollapsed, toggle } = useContext(CollapsibleListContext) as TCollapsibleListContext

  const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCollapsed) toggle(false)
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

const NewDashboardForm = ({ toggleNewBoardForm }: { toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { instance: dashboard, isDirty, update } = useContext(FormControlContext) as TFormControlContext<IName>
  return (
    <div className="ml-3 my-2">
      <Input
        className="mb-2"
        label="Dashboard name"
        placeholder="Enter dashboard name"
        size={SizeEnum.xs}
        required
        value={dashboard.name}
        update={(v) => update("name", v as string)}
      />
      <div className="flex justify-end gap-2">
        <Button background={BackgroundEnum.secondary} size={SizeEnum.xs} onClick={toggleNewBoardForm}>
          Cancel
        </Button>
        <Button background={BackgroundEnum.primary} size={SizeEnum.xs} disabled={!isDirty}>
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
          collapseListClass="mr-2"
          customListItem={
            newBoardFormVisible && (
              <FormControl<IName> instance={Name} defaultFormValue={{ name: "Default Value" }}>
                <NewDashboardForm toggleNewBoardForm={toggleNewBoardForm} />
              </FormControl>
            )
          }
        >
          <AddNewButton disabled={newBoardFormVisible} toggleNewBoardForm={toggleNewBoardForm} />
        </CollapsibleList>
      </CollapsibleListProvider>
    </Sidebar>
  )
}
