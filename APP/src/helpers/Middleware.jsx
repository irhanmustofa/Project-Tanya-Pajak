import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Middleware() {
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = 30 * 60 * 1000;
    const lastAccess = useLocalStorage.get("lastAccess");
    const email = useLocalStorage.get("email");
    const token = useLocalStorage.get("token");

    const now = new Date().getTime();
    const lastAccessTime = new Date(lastAccess).getTime();
    const timeDiff = now - lastAccessTime;

    if (!email || !token || !lastAccess) {
      navigate("/");
      return;
    }

    if (timeDiff > expiry && !useLocalStorage.isAdmin()) {
      useLocalStorage.remove();
      navigate("/");
    } else {
      useLocalStorage.set("lastAccess", new Date().toISOString());
    }
  }, [navigate]);

  return null;
}
