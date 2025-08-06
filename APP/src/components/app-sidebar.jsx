import React, { Suspense } from "react"; // Tambahkan React import
import { Link } from "react-router-dom";
import { NavMain } from "@/components/nav-main";
<<<<<<< HEAD
=======
// import { NavProjects } from "@/components/nav-projects";
>>>>>>> fd410b4 (update-register)
import { NavUser } from "@/components/nav-user";
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
<<<<<<< HEAD
import { TeamSwitcher } from "./team-switcher";
=======
>>>>>>> fd410b4 (update-register)

export function AppSidebar({ ...props }) {
  const { dialogState, dialogAction } = useDialog();
  const dispatch = useDialogDispatch();
  const { toggleSidebar } = useSidebar();
<<<<<<< HEAD
  const { users, sidebars, companyList } = sidebarData();
=======
  const { users, sidebars } = sidebarData();
>>>>>>> fd410b4 (update-register)
  const isOpen = useLocalStorage.get("sb") === "true";

  const handleClick = () => {
    if (!isOpen) {
      toggleSidebar("ok");
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <Sidebar collapsible="icon" {...props}>
          <SidebarHeader>
            <div className="flex items-center p-2">
              <Link to="/dashboard">
                <img src={logo} alt="logo" className="w-10" />
              </Link>
              <SidebarGroupLabel className="ml-2 text-xl">
<<<<<<< HEAD
                Tanya Pajak
              </SidebarGroupLabel>
            </div>

            {/* Wrap dengan Suspense dan error boundary */}
            <Suspense fallback={<div>Loading...</div>}>
              <TeamSwitcher teams={companyList} />
            </Suspense>
          </SidebarHeader>

=======
                CRM Dashboard
              </SidebarGroupLabel>
            </div>
            {/* <TeamSwitcher teams={teams} /> */}
          </SidebarHeader>
>>>>>>> fd410b4 (update-register)
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
<<<<<<< HEAD
          </SidebarContent>

=======
            {/* <NavProjects projects={projects} /> */}
          </SidebarContent>
>>>>>>> fd410b4 (update-register)
          <SidebarFooter>
            <NavUser
              user={users}
              onLogout={() =>
                dispatch({
                  type: dialogAction.DIALOG_LOGOUT,
                  payload: {
                    isOpen: true,
                    title: "Logout",
                    message: "Are you sure you want to logout?",
                    status: "warning",
                  },
                })
              }
            />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </div>
      {dialogState.isOpen && <DialogLogout />}
    </>
  );
}
