import * as React from "react";
import {
  ChevronsUpDown,
  CircleChevronRight,
  Settings,
  SquareSquare,
  User,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState, useEffect, useContext } from "react";
import { layoutsContext } from "@/layouts/LayoutContextProvider";
import { Link } from "react-router-dom";

export function CompanySetting() {
  const { company } = useContext(layoutsContext);
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
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
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Profile
            </DropdownMenuLabel>

            <Link to="/update-profile">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <User className="size-4" />
                </div>
                Detail Profile
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={() => console.log("Navigate to settings")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Settings className="size-4" />
              </div>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
