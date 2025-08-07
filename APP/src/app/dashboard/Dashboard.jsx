import { use, useEffect, useState } from "react";
import MainPage from "@/layouts/MainPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/auth/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <MainPage>
      <h1>
        Dashboard
        <span className="text-muted-foreground text-sm"></span>
      </h1>
    </MainPage>
  );
}
