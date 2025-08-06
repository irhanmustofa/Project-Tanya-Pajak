import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./app/auth/AuthContext";
import { PendingRequestProvider } from "./hooks/use-pending-request";
import LoginPage from "@/app/auth/login/login-page";
import ForgotPage from "@/app/auth/forgot/forgot-page";
import Coa from "@/app/management/coa/master/Coa";
import ResetPage from "@/app/auth/reset/reset-page";
import VerifyPage from "@/app/auth/verify/verify-page";
import Dashboard from "@/app/dashboard/Dashboard";
import Users from "@/app/management/users/Users";
import DialogProvider from "@/dialogs/DialogProvider";
import QRCodeViewer from "./app/auth/wa-qr/QRCodeViewer";
import NotFound from "./app/NotFound";
import ProtectedRoute from "./app/ProtectedRoute";
import Groups from "./app/management/groups/Groups";
import Clients from "./app/management/clients/profile/Clients";
import PeriodeLaporan from "./app/management/clients/periode-laporan/PeriodeLaporan";
import TarifCit from "./app/management/clients/tarif-cit/TarifCit";
import Jurnal from "./app/jurnals/jurnal/Jurnal";
import ProfilePerusahaan from "./app/management/clients/profile/ProfilePerusahaan";
import ViewProfile from "./app/management/clients/profile/ViewProfile";
import MasterAsset from "./app/asset/master-asset/MasterAsset";
import CoaHead from "./app/management/coa/head/CoaHead";
import CoaGroup from "./app/management/coa/group/CoaGroup";
import SaldoAwal from "./app/worksheets/saldo-awal/SaldoAwal";
import JurnalUmum from "./app/worksheets/jurnal-umum/JurnalUmum";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/qr", element: <QRCodeViewer /> },
  { path: "/verify/:token", element: <VerifyPage /> },
  { path: "/forgot", element: <ForgotPage /> },
  { path: "/reset/:token", element: <ResetPage /> },
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/user", element: <Users /> },
      { path: "/group", element: <Groups /> },
      { path: "/client", element: <Clients /> },
      { path: "/view-profile", element: <ViewProfile /> },
      { path: "/perusahaan", element: <ProfilePerusahaan /> },
      { path: "/periode-laporan", element: <PeriodeLaporan /> },
      { path: "/tarif-cit", element: <TarifCit /> },
      { path: "/coa/master", element: <Coa /> },
      { path: "/coa/group", element: <CoaGroup /> },
      { path: "/coa/head", element: <CoaHead /> },
      { path: "/jurnal", element: <Jurnal /> },
      { path: "/master-asset", element: <MasterAsset /> },

      // Buku Buku
      { path: "/saldo-awal", element: <SaldoAwal /> },
      { path: "/jurnal-umum", element: <JurnalUmum /> },
      { path: "/asset", element: <MasterAsset /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DialogProvider>
        <Toaster
          theme="dark"
          position="top-right"
          richColors
          toastOptions={{ duration: 3000 }}
        />

        <PendingRequestProvider>
          <RouterProvider router={router} />
        </PendingRequestProvider>
      </DialogProvider>
    </AuthProvider>
  </StrictMode>
);
