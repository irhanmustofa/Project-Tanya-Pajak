import { createContext, use, useContext, useEffect, useState } from "react";
// import { getAuthorization } from "./auth-service";
import { useLocalStorage } from "@/hooks/use-local-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    token: null,
    user: null,
  });
  useEffect(() => {
    const checkAuth = async () => {
      const token = useLocalStorage.get("token");

      if (!token) {
        setAuth({
          loading: false,
          isAuthenticated: false,
          token: null,
          user: null,
        });
        return;
      }

      try {
        const response = await getAuthorization();
        if (token === response.data[0].token) {
          setAuth({
            loading: false,
            isAuthenticated: true,
            token: token,
            user: response.data[0].user || null,
          });
        } else {
          useLocalStorage.remove("token");
          setAuth({
            loading: false,
            isAuthenticated: true,
            token: null,
            user: null,
          });
        }
      } catch {
        setAuth({
          loading: false,
          isAuthenticated: true,
          token: null,
          user: null,
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
