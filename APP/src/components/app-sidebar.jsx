import { Link } from "react-router-dom";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { sidebarData } from "@/layouts/SidebarData";
import DialogLogout from "@/dialogs/DialogLogout";

import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { LucideLayoutDashboard } from "lucide-react";
import logo from "@/public/vite.svg";
import { TeamSwitcher } from "./team-switcher";
import { NavSetting } from "./nav-setting";
import ClientProvider from "@/app/management/clients/profile/client-components/ClientProvider";

export function AppSidebar({ ...props }) {
  const { dialogState, dialogAction } = useDialog();
  const dispatch = useDialogDispatch();
  const { toggleSidebar } = useSidebar();
  const { users, sidebars, teams, is_settings, is_settings_coa, clientList } =
    sidebarData();
  const isOpen = useLocalStorage.get("sb") === "true";

  const handleClick = () => {
    if (!isOpen) {
      toggleSidebar("ok");
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <ClientProvider>
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <div className="flex items-center p-2">
                <Link to="/dashboard">
                  <img src={logo} alt="logo" className="w-10" />
                </Link>
                <SidebarGroupLabel className="ml-2 text-xl">
                  My Accounting
                </SidebarGroupLabel>
              </div>
              <TeamSwitcher teams={clientList} />
            </SidebarHeader>

            <SidebarContent
              style={{
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link to="/dashboard">
                        <LucideLayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <NavMain items={sidebars} />
              <NavSetting items={{ is_settings, is_settings_coa }} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser
                user={users}
                onLogout={() => {
                  dispatch({
                    type: dialogAction.DIALOG_LOGOUT,
                    payload: {
                      isOpen: true,
                      title: "Logout",
                      message: "Are you sure you want to logout?",
                      status: "warning",
                    },
                  });
                }}
              />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </ClientProvider>
      </div>
      {dialogState.isOpen && <DialogLogout />}
    </>
  );
}
