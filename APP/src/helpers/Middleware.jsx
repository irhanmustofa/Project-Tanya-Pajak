import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Middleware() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const expiry = 30 * 60 * 1000;

      const lastAccess = useLocalStorage.get("lastAccess");
      const email = useLocalStorage.get("email");
      const token = useLocalStorage.get("token");

      if (!email || !token) {
        useLocalStorage.remove();
        navigate("/", { replace: true });
        return;
      }

      if (!lastAccess) {
        useLocalStorage.set("lastAccess", new Date().toISOString());
        return;
      }

      const now = Date.now();
      let lastAccessTime;

      if (typeof lastAccess === "number") {
        lastAccessTime = lastAccess;
      } else if (typeof lastAccess === "string") {
        const numericValue = Number(lastAccess);
        if (!isNaN(numericValue) && numericValue > 0) {
          lastAccessTime = numericValue;
        } else {
          const dateValue = new Date(lastAccess).getTime();
          if (!isNaN(dateValue)) {
            lastAccessTime = dateValue;
          } else {
            useLocalStorage.set("lastAccess", new Date().toISOString());
            return;
          }
        }
      } else {
        useLocalStorage.set("lastAccess", new Date().toISOString());
        return;
      }

      const timeDiff = now - lastAccessTime;
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));

      if (timeDiff > expiry) {
        useLocalStorage.remove();
        navigate("/", { replace: true });
      } else {
        useLocalStorage.set("lastAccess", new Date().toISOString());
      }
    } catch (error) {
      console.error("Middleware error:", error);
      useLocalStorage.remove();
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
}
