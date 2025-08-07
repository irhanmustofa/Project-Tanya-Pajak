import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { useEffect } from "react";
import LoaderFull from "@/components/custom/LoaderFull";
import LoaderOverlay from "@/components/custom/loader-overlay";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <LoaderOverlay />;
  }

  return children;
};

export default ProtectedRoute;
