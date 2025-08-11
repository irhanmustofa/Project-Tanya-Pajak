import { createContext, useContext, useEffect, useState } from "react";
import { userClientAll } from "@/layouts/UserClientService";

const layoutsContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await userClientAll();
        if (res.success) {
          setCompanies(res.data);
          setError(null);
        } else {
          setError(res.message);
          setCompanies([]);
        }
      } catch (error) {
        console.error("LayoutProvider - Error fetching companies:", error);
        setError("Failed to fetch companies");
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <layoutsContext.Provider
      value={{
        companies,
        setCompanies,
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
