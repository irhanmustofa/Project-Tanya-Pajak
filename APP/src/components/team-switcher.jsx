import * as React from "react";
import { ChevronsUpDown, Plus, Search, SquareSquare } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState, useEffect, useCallback } from "react";

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const savedClientId = useLocalStorage.get("clientId");
  console.log("Saved Client ID:", savedClientId);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const getInitialTeam = () => {
    if (savedClientId && teams.length > 0) {
      const savedClient = teams.find((team) => team.clientId === savedClientId);
      return savedClient || teams[0] || {};
    }
    return teams[0] || {};
  };

  const [activeTeam, setActiveTeam] = useState(getInitialTeam());

  useEffect(() => {
    if (teams.length > 0) {
      setActiveTeam(getInitialTeam());
    }
  }, [teams, savedClientId]);
  console.log("Active Team:", activeTeam);
  const handleTeamSelect = (client) => {
    setActiveTeam(client);
    useLocalStorage.set("clientId", client.clientId);
    window.location.reload();
  };

  const filteredTeams =
    debouncedQuery === ""
      ? teams
      : teams.filter((client) =>
          client.name?.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

  const [openAdd, setOpenAdd] = useState(false);
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
                  {activeTeam.name || "Select Client"}
                </span>
                <span className="truncate text-xs">Client</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
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
              Clients
            </DropdownMenuLabel>

            <div className="px-2 py-1 sticky top-0 bg-background z-10">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={(input) => {
                    if (input) {
                      setTimeout(() => input.focus(), 100);
                    }
                  }}
                  type="text"
                  placeholder="Search clients..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  className="w-full pl-8 pr-2 py-1 text-sm border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <DropdownMenuSeparator />

            {debouncedQuery !== "" && filteredTeams.length === 0 ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                No clients found
              </div>
            ) : (
              filteredTeams.map((client, index) => (
                <DropdownMenuItem
                  key={client._id || client.name || index}
                  onClick={() => handleTeamSelect(client)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <SquareSquare className="size-4" />
                  </div>
                  {client.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setOpenAdd(true)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add client
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
