import { layoutsContext } from "@/layouts/LayoutContext";
import { useEffect, useState } from "react";
import { clientAll } from "@/app/management/clients/profile/client-components/ClientService";

export function LayoutProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientAll().then((res) => {
      if (res.success) setClients(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <layoutsContext.Provider value={{ clients, setClients, loading }}>
      {children}
    </layoutsContext.Provider>
  );
}
