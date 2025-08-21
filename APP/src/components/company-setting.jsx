import * as React from "react";
import {
  AwardIcon,
  Bell,
  BookCopy,
  ChevronRight,
  CircleChevronRight,
  File,
  FileSignature,
  FileStack,
  FileUser,
  Locate,
  PencilLineIcon,
  PenSquareIcon,
  ScrollText,
  SquareSquare,
  Trash2,
  User,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useContext } from "react";
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
            <Link to="/documents" className="flex items-center gap-2">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <File className="size-4" />
                </div>
                My Documents
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to profile")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Bell className="size-4" />
              </div>
              My Notifications
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to profile")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FileUser className="size-4" />
              </div>
              My Cases
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to profile")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <ScrollText className="size-4" />
              </div>
              My Due Cases
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to profile")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <User className="size-4" />
              </div>
              My Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => console.log("Navigate to settings")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <AwardIcon className="size-4" />
              </div>
              Sertifikat Elektronik
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to settings")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <BookCopy className="size-4" />
              </div>
              Pengukuhan PKP
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to settings")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FileStack className="size-4" />
              </div>
              Pendaftaran Objek Pajak PBB P5L
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <FileSignature className="size-4" />
                </div>
                Perubahan Data
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-48">
                <Link to="/update-profile">
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-4 items-center justify-center">
                      <User className="size-3" />
                    </div>
                    Identitas Wajib Pajak
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => console.log("Navigate to data perusahaan")}
                  className="gap-2 p-2"
                >
                  <div className="flex size-4 items-center justify-center">
                    <Locate className="size-3" />
                  </div>
                  Perubahan Alamat Utama
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Navigate to data alamat")}
                  className="gap-2 p-2"
                >
                  <div className="flex size-4 items-center justify-center">
                    <FileSignature className="size-3" />
                  </div>
                  Perubahan Data Objek Pajak PBB P5L
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Navigate to data kontak")}
                  className="gap-2 p-2"
                >
                  <div className="flex size-4 items-center justify-center">
                    <PenSquareIcon className="size-3" />
                  </div>
                  Perubahan Data Pemungut PPN PMSE dengan Kepdirjen
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <PencilLineIcon className="size-4" />
                </div>
                Perubahan Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-48">
                <DropdownMenuItem className="gap-2 p-2">
                  Penetapan Wajib Pajak Nonaktif
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Pengaktifan Kembali Wajib Pajak Nonaktif
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Penunjukan Pemungut PMSE Dalam Negeri
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Penetapan Pemungut Bea Meterai
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Pencabutan Pemungut Bea Meterai
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Penunjukan Wakil/Kuasa
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Perubahan Data Wakil/Kuasa Wajib Pajak
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Pencabutan Wakil/Kuasa
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Penunjukan Pemotong atau Pemungut PPh/PPN
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Pencabutan Pemotong atau Pemungut PPh/PPN
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Pencabutan Pemungut PPN PMSE
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Lembaga Keuangan Pelapor - Penetapan
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Lembaga Keuangan Pelapor - Pencabutan
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  Lembaga Keuangan Pelapor - Perubahan Data
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => console.log("Navigate to settings")}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Trash2 className="size-4" />
              </div>
              Penghapusan & Pencabutan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
