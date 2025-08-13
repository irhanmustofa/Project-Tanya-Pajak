import { createContext, useContext, useEffect, useState } from "react";
import { userClientAll } from "@/layouts/UserClientService";
import { useLocalStorage } from "@/hooks/use-local-storage";

const layoutsContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);

        const clientId = useLocalStorage.get("clientId");

        if (!clientId) {
          setError("Client ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await userClientAll(clientId);

        if (response.success) {
          setCompany(response.data[0]);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch company");
          setCompany([]);
        }
      } catch (err) {
        console.error("LayoutProvider - Error:", err);
        setError(err.message || "An error occurred while fetching company");
        setCompany([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <layoutsContext.Provider
      value={{
        company,
        setCompany,
        loading,
        error,
      }}
    >
      {children}
    </layoutsContext.Provider>
  );
};

export const useLayouts = () => {
  const context = useContext(layoutsContext);

  if (!context) {
    throw new Error("useLayouts must be used within a LayoutProvider");
  }

  return context;
};

export { layoutsContext };
