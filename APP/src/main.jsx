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
import ResetPage from "@/app/auth/reset/reset-page";
import VerifyPage from "@/app/auth/verify/verify-page";
import Dashboard from "@/app/dashboard/Dashboard";
import Users from "@/app/management/users/Users";
import DialogProvider from "@/dialogs/DialogProvider";
import QRCodeViewer from "./app/auth/wa-qr/QRCodeViewer";
import NotFound from "./app/NotFound";
import ProtectedRoute from "./app/ProtectedRoute";

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
