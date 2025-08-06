import { useState } from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  FolderCogIcon,
  ShoppingBagIcon,
  WalletIcon,
  LucideUser2,
  LucideCommand,
  LucidePresentation,
  LucideScale,
<<<<<<< HEAD
  GalleryVerticalEndIcon,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { layoutsContext } from "@/layouts/LayoutContextProvider"; // Import dari file yang benar
=======
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
>>>>>>> fd410b4 (update-register)

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
<<<<<<< HEAD
    name: useLocalStorage.get("name") || "Guest",
    email: useLocalStorage.get("email") || "",
=======
    name: useLocalStorage.get("name"),
    email: useLocalStorage.get("email"),
>>>>>>> fd410b4 (update-register)
    role: useLocalStorage.get("role") || 7,
    avatar: avatarImage(),
  });

  const users = userState;
  const setUser = (user) => setUserState({ ...userState, ...user });

<<<<<<< HEAD
  // Sekarang menggunakan companies dari LayoutProvider
  const { companies } = useContext(layoutsContext);
  const [companyState, setCompanyState] = useState([]);

  useEffect(() => {
    console.log("SidebarData - companies from context:", companies);

    if (companies && companies.length > 0) {
      setCompanyState(
        companies.map((company) => ({
          id: company._id,
          name: company.company_name,
          clientId: company.client_id,
        }))
      );
    }
  }, [companies]);

  console.log("SidebarData - companyState:", companyState);
  const companyList = companyState;

  const setCompanies = (companyList) => {
    setCompanyState(companyList);
  };
=======
  const [teamState, setTeamState] = useState([
    { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ]);

  const teams = teamState;
  const setTeam = (teams) => setTeamState(teams);
>>>>>>> fd410b4 (update-register)

  const path = window.location.pathname;
  const is_administration = path === "/user" || path === "/client-group";
  const is_marketing =
    path === "/client" ||
    path === "/service" ||
    path === "/quotation" ||
    path === "/contract";
<<<<<<< HEAD
=======
  const is_finance =
    path === "/invoice" || path === "/payment" || path === "/outstanding";
  const is_hr = path === "/incentive" || path === "/member";
  const is_spv =
    path === "/project" || path === "/team" || path === "/project-reports";
  const is_project = path === "/projects";
  const is_legal = path === "/legal-order" || path === "/legal-report";
>>>>>>> fd410b4 (update-register)

  const fullSidebar = [
    {
      title: "Administration",
      url: "#",
      icon: FolderCogIcon,
      isActive: is_administration,
      items: [
        { title: "Master Users", url: "/user" },
        { title: "Master Groups", url: "/client-group" },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: ShoppingBagIcon,
      isActive: is_marketing,
      items: [
        { title: "Clients", url: "/client" },
        { title: "Services", url: "/service" },
        { title: "Quotations", url: "/quotation" },
        { title: "Contracts", url: "/contract" },
      ],
    },
<<<<<<< HEAD
  ];
=======
    {
      title: "Legal",
      url: "#",
      icon: LucideScale,
      isActive: is_legal,
      items: [
        { title: "Order", url: "/legal-order" },
        { title: "Report", url: "/legal-report" },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: WalletIcon,
      isActive: is_finance,
      items: [
        { title: "Invoices", url: "/invoice" },
        { title: "Payments", url: "/payment" },
        { title: "Outstanding", url: "/outstanding" },
      ],
    },
    {
      title: "Supervisor",
      url: "#",
      icon: LucideUser2,
      isActive: is_spv,
      items: [
        { title: "Team", url: "/team" },
        { title: "Projects", url: "/project" },
        { title: "Reports", url: "/project-reports" },
      ],
    },
    {
      title: "Human Resources",
      url: "#",
      icon: LucideCommand,
      isActive: is_hr,
      items: [
        { title: "Members", url: "/member" },
        { title: "Incentives", url: "/incentive" },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: LucidePresentation,
      isActive: is_project,
      items: [{ title: "Project List", url: "/projects" }],
    },
  ];

  const roleAccess = {
    0: {
      Administration: ["Master Users", "Master Groups"],
      Marketing: ["Clients", "Services", "Quotations", "Contracts"],
      Legal: ["Order", "Payment", "Report"],
      Finance: ["Invoices", "Payments", "Outstanding"],
      Supervisor: ["Team", "Projects", "Reports"],
      "Human Resources": ["Members", "Incentives"],
      Projects: ["Project List"],
    },
    1: {
      Administration: ["Master Users", "Master Groups"],
      Marketing: ["Clients"],
    },
    2: {
      Finance: ["Invoices", "Payments", "Outstanding"],
      Marketing: ["Clients", "Services"],
    },
    3: { Marketing: ["Clients", "Services", "Quotations", "Contracts"] },
    4: {
      Supervisor: ["Team", "Projects", "Reports"],
      Projects: ["Project List"],
    },
    5: { Supervisor: ["Team", "Reports"], Projects: ["Project List"] },
    6: { Supervisor: ["Team"] },
    7: { "Human Resources": ["Members", "Incentives"] },
    8: { Legal: ["Order", "Payment", "Report"] },
  };

  const filteredSidebar = fullSidebar
    .map((menu) => {
      const allowedMenu = roleAccess[users.role]?.[menu.title];
      if (!allowedMenu) return null;

      const filteredItems = menu.items.filter((item) =>
        allowedMenu.includes(item.title)
      );

      return { ...menu, items: filteredItems };
    })
    .filter((menu) => menu && menu.items.length > 0);

  const [sidebarState, setSidebarState] = useState(filteredSidebar);
>>>>>>> fd410b4 (update-register)

  const [sidebarState, setSidebarState] = useState(fullSidebar);
  const sidebars = sidebarState;
  const setSidebar = (sidebar) => setSidebarState(sidebar);

<<<<<<< HEAD
  return { users, setUser, companyList, setCompanies, sidebars, setSidebar };
=======
  return { users, setUser, teams, setTeam, sidebars, setSidebar };
>>>>>>> fd410b4 (update-register)
};
