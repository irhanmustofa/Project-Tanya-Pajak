import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutProvider } from "@/layouts/LayoutContextProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Middleware from "@/helpers/Middleware";
import Spinner from "@/components/custom/spinner";
export default function MainPage({ children }) {
  return (
    <>
      {/* <Middleware /> */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LayoutProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex items-center justify-between">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </div>
                </header>
                <div className="flex items-center gap-2 px-4">
                  <Spinner />
                  <ModeToggle />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div>{children}</div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </>
  );
}
