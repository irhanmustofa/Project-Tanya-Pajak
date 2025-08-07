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
import ProfilePeriodeList from "@/app/management/clients/profile/profile-perusahaan/components/ProfilePeriodeList";

export function NavSetting({ items }) {
  const [showPDF, setShowPDF] = useState(false);

  const handleShowPDF = () => {
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        {showPDF && <ProfilePeriodeList onClose={handleClosePDF} />}
        {items.is_settings.map((item) => (
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

                      {subItem.title === "View Profile" && (
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
                                  <button
                                    onClick={handleShowPDF}
                                    className="flex items-center gap-2 w-full px-2 py-1 text-left hover:bg-gray-100"
                                  >
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

        {items.is_settings_coa.map((item) => (
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
