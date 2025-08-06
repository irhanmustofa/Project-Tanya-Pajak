import { useReducer, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { serviceContext, serviceDispatchContext } from "./ServiceContext";
import { serviceAll } from "./ServiceService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";

export default function ServiceProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [serviceState, serviceDispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    serviceAll().then((res) => {
      if (res.success) {
        serviceDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      serviceDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  if (serviceState.loading) {
    return <Loader />;
  }

  if (serviceState.error && serviceState.error !== "Data Not Found") {
    return (
      <div className="text-center font-semibold text-lg">
        <div className="text-center font-semibold text-lg mb-4">
          Server Connection Error
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh Data
        </Button>
      </div>
    );
  }

  const serviceAction = actionReducer;

  return (
    <serviceContext.Provider value={{ serviceState, serviceAction }}>
      <serviceDispatchContext.Provider value={serviceDispatch}>
        {children}
      </serviceDispatchContext.Provider>
    </serviceContext.Provider>
  );
}

export const useService = () => {
  const context = useContext(serviceContext);

  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }

  return context;
};

export const useServiceDispatch = () => {
  const context = useContext(serviceDispatchContext);

  if (!context) {
    throw new Error("useServiceDispatch must be used within a ClientProvider");
  }

  return context;
};
