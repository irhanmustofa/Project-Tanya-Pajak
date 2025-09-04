import { ChevronRight, CircleCheck, MoreVertical } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePermissions } from "@/hooks/use-permissions";

export function NavMain({ items }) {
  const { checkPermission } = usePermissions();
  const { isMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {items
          .filter(
            (item) => !item.permission || checkPermission(item.permission)
          )
          .map((item) => {
            const filteredSubItems = item.items?.filter(
              (subItem) =>
                !subItem.permission || checkPermission(subItem.permission)
            );

            if (!filteredSubItems || filteredSubItems.length === 0) {
              return null;
            }

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {filteredSubItems.map((subItem) => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className="relative group"
                        >
                          {subItem.subMenus?.length > 0 ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <SidebarMenuSubButton
                                  className={`w-full justify-between py-5 ${
                                    subItem.url === window.location.pathname
                                      ? "font-bold italic bg-sidebar-accent text-sidebar-accent-foreground"
                                      : ""
                                  }`}
                                >
                                  <span>{subItem.title}</span>
                                  <MoreVertical className="w-4 h-4 ml-auto" />
                                </SidebarMenuSubButton>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                side={isMobile ? "bottom" : "right"}
                                className="w-full"
                                align="start"
                              >
                                {subItem.subMenus.map((action) => (
                                  <DropdownMenuItem key={action.title}>
                                    <button
                                      className="flex items-center gap-2 w-full px-2 py-1 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                      onClick={action.onClick}
                                    >
                                      <CircleCheck className="w-1" />
                                      {action.title}
                                    </button>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <SidebarMenuSubButton
                              asChild
                              className={`py-3 w-full ${
                                subItem.url === window.location.pathname
                                  ? "font-bold italic bg-sidebar-accent text-sidebar-accent-foreground"
                                  : ""
                              }`}
                            >
                              <Link
                                to={subItem.url}
                                className="flex items-center gap-2"
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
