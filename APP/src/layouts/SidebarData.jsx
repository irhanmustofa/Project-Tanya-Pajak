import { useState } from "react";
import { FileTextIcon, FolderCogIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

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
        { title: "Pajak Keluaran", url: "#" },
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
        { title: "Pajak Keluaran", url: "#" },
        { title: "Pajak Masukan", url: "#" },
        { title: "Retur Pajak Keluaran", url: "#" },
        { title: "Retur Pajak Masukan", url: "#" },
      ],
    },
  ];

  const [sidebarState, setSidebarState] = useState(fullSidebar);
  const sidebars = sidebarState;
  const setSidebar = (sidebar) => setSidebarState(sidebar);

  return { users, setUser, sidebars, setSidebar };
};
