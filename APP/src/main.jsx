import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "@/app/auth/login/login-page";
import ForgotPage from "@/app/auth/forgot/forgot-page";
import ResetPage from "@/app/auth/reset/reset-page";
import VerifyPage from "@/app/auth/verify/verify-page";
import Dashboard from "@/app/dashboard/Dashboard";
import Users from "@/app/management/users/Users";
import DialogProvider from "@/dialogs/DialogProvider";

import { PendingRequestProvider } from "./hooks/use-pending-request";
import RegisterPage from "./app/auth/register/register-page";
import Documents from "./app/company/documents/Documents";
import UpdateProfil from "./app/management/perubahan-profil/PerubahanProfil";
import PajakKeluarans from "./app/faktur-pajak/pajak-keluaran/PajakKeluarans";
import KonsepSpt from "./app/SPT/konsep-spt/KonsepSpt";
import CreateKonsepSPT from "./app/SPT/konsep-spt/CreateKonsepSPT/CreateKonsepSPT";
import CreatePage from "./app/SPT/konsep-spt/CreateKonsepSPT/CreatePage";
import PajakMasukans from "./app/faktur-pajak/pajak-masukan/PajakMasukans";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DialogProvider>
      <Toaster
        theme="dark"
        position="top-right"
        richColors
        toastOptions={{ duration: 3000 }}
      />

      <PendingRequestProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify/:token" element={<VerifyPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/reset/:token" element={<ResetPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/update-profile" element={<UpdateProfil />} />
            <Route path="/pajak-keluaran" element={<PajakKeluarans />} />
            <Route path="/konsep-spt" element={<KonsepSpt />} />
            <Route path="/spt/create-konsep-spt" element={<CreatePage />} />
            <Route path="/pajak-masukan" element={<PajakMasukans />} />
          </Routes>
        </Router>
      </PendingRequestProvider>
    </DialogProvider>
  </StrictMode>
);
