<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";
import { userClientAll } from "@/layouts/UserClientService";
import { useLocalStorage } from "@/hooks/use-local-storage";

const layoutsContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [role, setRole] = useState(null);

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
        console.log("Company response:", response);
        if (response.success) {
          setCompany(response.data[0]);
          setRole(response.data[0].role);
          setUserPermissions(response.data[0].permission || []);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch company");
          setCompany([]);
          setRole(null);
          setUserPermissions([]);
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
  console.log("User permissions:", userPermissions);

  // Permission checker function
  const hasPermission = (permissionKey) => {
    if (!userPermissions || userPermissions.length === 0) {
      return false;
    }
    return userPermissions.includes(permissionKey);
  };

  console.log("User permissions:", userPermissions);

  return (
    <layoutsContext.Provider
      value={{
        company,
        role,
        setCompany,
        userPermissions,
        loading,
        error,
        hasPermission, // Function to check permissions
      }}
    >
      {children}
    </layoutsContext.Provider>
=======
import { layoutsContext } from "@/layouts/LayoutContext";

export function LayoutProvider({ children }) {
  return (
    <layoutsContext.Provider value={{}}>{children}</layoutsContext.Provider>
>>>>>>> 2cd1356 (update-register)
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
