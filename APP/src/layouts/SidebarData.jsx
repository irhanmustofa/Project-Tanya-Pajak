import { useState } from "react";
import {
  FileTextIcon,
  FolderCogIcon,
  LucideUser2,
  WalletIcon,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useNavigate } from "react-router-dom";

export const sidebarData = () => {
  const avatarImage = () => {
    try {
      const name = useLocalStorage.get("name");
      if (!name) return null;

      return (
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`,
          }}
        >
          {name
            .split(" ")
            .map((n) => n?.charAt(0))
            .join("")
            .toUpperCase()}
        </div>
      );
    } catch (error) {
      console.error("Error creating avatar:", error);
      return null;
    }
  };

  const [userState, setUserState] = useState({
    name: useLocalStorage.get("name") || "Guest",
    email: useLocalStorage.get("email") || "",
    role: useLocalStorage.get("role") || 7,
    avatar: avatarImage(),
  });

  const users = userState;
  const setUser = (user) => setUserState({ ...userState, ...user });

  const path = window.location.pathname;
  const is_administration = path === "/users" || path === "/client-group";
  const is_efaktur = path === "/efaktur" || path === "/efaktur/transactions";
  const is_ebupot = path === "/ebupot" || path === "/ebupot/transactions";
  const is_spt = path === "/spt" || path === "/spt/transactions";
  const navigate = useNavigate();
  const fullSidebar = [
    {
      title: "Administration",
      url: "#",
      icon: FolderCogIcon,
      isActive: is_administration,
      items: [{ title: "Master Users", url: "/users" }],
    },
    {
      title: "E-Faktur",
      url: "#",
      icon: FileTextIcon,
      isActive: is_efaktur,
      items: [
        { title: "Pajak Keluaran", url: "/pajak-keluaran" },
        { title: "Pajak Masukan", url: "#" },
        { title: "Retur Pajak Keluaran", url: "#" },
        { title: "Retur Pajak Masukan", url: "#" },
      ],
    },
    {
      title: "E-Bupot",
      url: "#",
      icon: FileTextIcon,
      isActive: is_ebupot,
      items: [
        {
          title: "BPPU",
          url: "#",
        },
        {
          title: "BPNR",
          url: "#",
        },
        {
          title: "Penyetoran Sendiri",
          url: "#",
        },
        {
          title: "Pemotongan Secara Digunggung",
          url: "#",
        },
        {
          title: "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
          url: "#",
        },
        {
          title: "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
          url: "#",
        },
        {
          title: "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
          url: "#",
        },
        {
          title: "BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir",
          url: "#",
        },
        {
          title: "Bukti Pemotongan Bulanan Pegawai Tetap",
          url: "#",
        },
        {
          title:
            "Unggah Dokumen yang Dipersamakan dengan Bukti Pemotongan/Pemungutan",
          url: "#",
        },
      ],
    },
    {
      title: "Surat Pemberitahuan (SPT)",
      url: "#",
      icon: FileTextIcon,
      isActive: is_spt,
      items: [
        {
          title: "Surat Pemberitahuan (SPT)",
          icon: WalletIcon,
          subMenus: [
            {
              title: "Konsep SPT",
              onClick: () => {
                navigate("/spt/konsep-spt");
              },
            },
            {
              title: "SPT Menunggu Pembayaran",
              onClick: () => {
                console.log("Edit Profile clicked");
              },
            },
            {
              title: "SPT Dilaporkan",
              onClick: () => {
                console.log("Export Profile clicked");
              },
            },
            {
              title: "SPT Ditolak",
              onClick: () => {
                console.log("Export Profile clicked");
              },
            },
            {
              title: "SPT Dibatalkan",
              onClick: () => {
                console.log("Export Profile clicked");
              },
            },
          ],
        },
        {
          title: "Pencatatan",
          url: "#",
        },
        {
          title: "Dasbor Kompensasi",
          url: "#",
        },
        {
          title: "Koreksi SPT",
          url: "#",
        },
      ],
    },
  ];

  const [sidebarState, setSidebarState] = useState(fullSidebar);
  const sidebars = sidebarState;
  const setSidebar = (sidebar) => setSidebarState(sidebar);

  return { users, setUser, sidebars, setSidebar };
};
