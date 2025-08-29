import {
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleMinus,
  Disc,
  Disc2,
  List,
  ListCheck,
  MoreVertical,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  CircleBackslashIcon,
  ListBulletIcon,
  MobileIcon,
} from "@radix-ui/react-icons";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
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
                  <span className="">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
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
                            side="right"
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
                        // Jika tidak ada subMenus, gunakan Link biasa
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
                            <span className="">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
