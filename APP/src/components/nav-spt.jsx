import {
  ChevronRight,
  FileIcon,
  FolderIcon,
  MoreVertical,
  ShareIcon,
  Trash2Icon,
  LucideLayoutDashboard,
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
import { useState } from "react";

export function NavSpt({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Surat Pemberitahuan SPT</SidebarGroupLabel>
      <SidebarMenu>
        {items.is_spt.map((item) => (
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
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className="relative group"
                    >
                      <SidebarMenuSubButton
                        asChild
                        className={
                          subItem.url === window.location.pathname
                            ? "font-bold italic bg-sidebar-accent text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>

                      {subItem?.subMenus && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-gray-400 hover:text-white p-1">
                                <MoreVertical size={16} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-48">
                              {subItem.subMenus.map((action) => (
                                <DropdownMenuItem key={action.title} asChild>
                                  <button className="flex items-center gap-2 w-full px-2 py-1 text-left hover:bg-gray-100">
                                    <action.icon className="w-4 h-4 " />
                                    {action.title}
                                  </button>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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
