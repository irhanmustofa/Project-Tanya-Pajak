import { use, useEffect, useState } from "react";
import MainPage from "@/layouts/MainPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/auth/AuthContext";
import { clientFirst } from "../management/clients/profile/client-components/ClientService";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Dashboard() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState(() => {
    return useLocalStorage.get("clientId") || "";
  });
  const [dataClient, setDataClient] = useState(null);
  const { isAuthenticated, loading } = useAuth();
  useEffect(() => {
    const fetchClientData = async () => {
      if (clientId) {
        const result = await clientFirst(clientId);
        if (result.success) {
          setDataClient(result.data[0]);
        }
      }
    };

    fetchClientData();
  }, [clientId]);
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
        <span className="text-muted-foreground text-sm">
          {" "}
          ({dataClient?.company_name})
        </span>
      </h1>
    </MainPage>
  );
}
