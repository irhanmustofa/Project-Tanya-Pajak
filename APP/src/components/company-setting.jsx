import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { layoutsContext } from "@/layouts/LayoutContextProvider";
import { Link } from "react-router-dom";
import { CircleChevronRight, SquareSquare } from "lucide-react";
import { profileMenu } from "./profileMenu";
import { usePermissions } from "@/hooks/use-permissions";

export function CompanySetting() {
  const { company } = useContext(layoutsContext);
  const { checkPermission } = usePermissions();
  const { isMobile } = useSidebar();

  const renderMenu = (items) => {
    return items.map((item, idx) => {
      if (!checkPermission(item.permission)) return null;

      if (item.children) {
        return (
          <DropdownMenuSub key={idx}>
            <DropdownMenuSubTrigger className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {item.icon && <item.icon className="size-4" />}
              </div>
              {item.title}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-48">
              {renderMenu(item.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={idx}
          className="gap-2 p-2"
          onClick={item.onClick}
        >
          {item.link ? (
            <Link to={item.link} className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {item.icon && <item.icon className="size-4" />}
              </div>
              {item.title}
            </Link>
          ) : (
            <>
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {item.icon && <item.icon className="size-4" />}
              </div>
              {item.title}
            </>
          )}
        </DropdownMenuItem>
      );
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <SquareSquare className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {company.company_name}
                </span>
                <span className="truncate text-xs">Company</span>
              </div>
              <CircleChevronRight className="size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {renderMenu(profileMenu)}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
