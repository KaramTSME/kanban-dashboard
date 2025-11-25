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

const NewDashboardFormElements = () => {
  const { instance: dashboard, update } = useContext(FormControlContext) as TFormControlContext<IName>

  return (
    <Input
      className="mb-2"
      label="Dashboard name"
      placeholder="Enter dashboard name"
      size={SizeEnum.xs}
      required
      value={dashboard.name}
      update={(v) => update("name", v as string)}
    />
  )
}

const NewDashboardFormActions = ({ toggleNewBoardForm }: { toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { isDirty, isDisabled, submit } = useContext(FormControlContext) as TFormControlContext<IName>

  return (
    <div className="flex justify-end gap-2">
      <Button background={BackgroundEnum.secondary} size={SizeEnum.xs} disabled={isDisabled} onClick={toggleNewBoardForm}>
        Cancel
      </Button>
      <Button background={BackgroundEnum.primary} size={SizeEnum.xs} disabled={!isDirty || isDisabled} onClick={submit}>
        Create
      </Button>
    </div>
  )
}

const NewDashboardForm = ({ toggleNewBoardForm }: { toggleNewBoardForm: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const submit = (instance: IName) =>
    new Promise<void>(async (r, x) => {
      try {
        console.log(instance)
        setTimeout(r, 3000)
      } catch (error) {
        x(error)
      }
    })

  return (
    <FormControl<IName>
      instance={Name}
      defaultFormValue={{ name: "Default Value" }}
      actionsSlot={<NewDashboardFormActions toggleNewBoardForm={toggleNewBoardForm} />}
      className="ml-3"
      submit={submit}
    >
      <NewDashboardFormElements />
    </FormControl>
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
          customListItem={newBoardFormVisible && NewDashboardForm({ toggleNewBoardForm })}
        >
          <AddNewButton disabled={newBoardFormVisible} toggleNewBoardForm={toggleNewBoardForm} />
        </CollapsibleList>
      </CollapsibleListProvider>
    </Sidebar>
  )
}
