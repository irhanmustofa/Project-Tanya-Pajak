import { useContext, useEffect, useState } from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  FolderCogIcon,
  WalletIcon,
  LucideUser2,
  BookDashed,
  LucideFileChartColumn,
  Folders,
  FolderSync,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  masterAsset,
  masterBuku,
  masterProses,
  masterReport,
} from "@/helpers/variables";
import { layoutsContext } from "@/layouts/LayoutContext";

export const sidebarData = () => {
  const avatarImage = () => {
    return (
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        }}
      >
        {useLocalStorage
          .get("name")
          ?.split(" ")
          .map((name) => name?.charAt(0))
          .join("")}
      </div>
    );
  };

  // users
  const [userState, setUserState] = useState({
    name: useLocalStorage.get("name"),
    email: useLocalStorage.get("email"),
    avatar: avatarImage(),
  });

  const users = userState;

  const setUser = (user) => {
    setUserState({
      ...userState,
      ...user,
    });
  };

  // clients
  const { clients } = useContext(layoutsContext);
  const [clientsState, setClientsState] = useState([]);

  useEffect(() => {
    if (clients && clients.length > 0) {
      setClientsState(
        clients.map((client) => ({
          name: client.company_name,
          _id: client._id,
          avatar: avatarImage(),
          logo: client.logo,
        }))
      );
    }
  }, [clients]);

  const clientList = clientsState;
  const setClients = (clientList) => {
    setClientsState(clientList);
  };

  // teams
  const [teamState, setTeamState] = useState([
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ]);

  const teams = teamState;
  const setTeam = (teams) => setTeamState(teams);

  const path = window.location.pathname;
  const is_administration =
    path === "/user" || path === "/group" || path === "/client";
  const is_assets = path === "/asset" || path === "/asset-group";
  const is_jurnals = path.startsWith("/buku/");
  const is_reports = path.startsWith("/report/") || path === "/report";
  const is_proses = path.startsWith("/proses/") || path === "/proses";
  // groups
  const settings =
    path === "/perusahaan" ||
    path === "/view-profile" ||
    path === "/direktur-pengurus" ||
    path === "/setting" ||
    path === "/periode-laporan" ||
    path === "/tarif-cit" ||
    path === "/legalitas";

  const [is_settings, setIsSettings] = useState([
    {
      title: "Profile",
      url: "#",
      icon: LucideUser2,
      isActive: settings,
      items: [
        {
          title: "View Profile",
          url: "/perusahaan",
          icon: WalletIcon,
          subMenus: [
            {
              title: "Print Profile",
              url: "#",
              icon: WalletIcon,
            },
          ],
        },
        {
          title: "Periode Laporan",
          url: "/periode-laporan",
          icon: WalletIcon,
        },
      ],
    },
  ]);

  const settings_coa =
    path === "/coa/master" || path === "/coa/head" || path === "/coa/group";

  const [is_settings_coa, setIsSettingsCoa] = useState([
    {
      title: "COA",
      url: "#",
      icon: LucideUser2,
      isActive: settings_coa,
      items: [
        {
          title: "Master COA",
          url: "/coa/master",
          icon: WalletIcon,
        },
        {
          title: "Group",
          url: "/coa/group",
          icon: WalletIcon,
        },
        {
          title: "Head",
          url: "/coa/head",
          icon: WalletIcon,
        },
      ],
    },
  ]);

  // sidebar
  const [sidebarState, setSidebarState] = useState([
    {
      title: "Administration",
      url: "#",
      icon: FolderCogIcon,
      isActive: is_administration,
      items: [
        {
          title: "Master Users",
          url: "/user",
        },
        {
          title: "Master Groups",
          url: "/group",
        },
        {
          title: "Master Clients",
          url: "/client",
        },
      ],
    },
    {
      title: "Assets",
      url: "#",
      icon: Folders,
      isActive: is_assets,
      items: masterAsset.map((aset) => ({
        title: aset.name,
        url: `/${aset.url}`,
      })),
    },
    {
      title: "Buku-buku",
      url: "#",
      icon: BookDashed,
      isActive: is_jurnals,
      items: masterBuku.map((buku) => ({
        title: buku.name,
        url: `/${buku.url}`,
      })),
    },
    {
      title: "Reports",
      url: "#",
      icon: LucideFileChartColumn,
      isActive: is_reports,
      items: masterReport.map((report) => ({
        title: report.name,
        url: `#`,
      })),
    },
    {
      title: "Proses",
      url: "#",
      icon: FolderSync,
      isActive: is_proses,
      items: masterProses.map((proses) => ({
        title: proses.name,
        url: `#`,
      })),
    },
  ]);

  const sidebars = sidebarState;
  const setSidebar = (sidebar) => setSidebarState(sidebar);

  return {
    users,
    setUser,
    teams,
    setTeam,
    sidebars,
    setSidebar,
    is_settings,
    setIsSettings,
    is_settings_coa,
    setIsSettingsCoa,
    clientList,
    setClients,
  };
};
