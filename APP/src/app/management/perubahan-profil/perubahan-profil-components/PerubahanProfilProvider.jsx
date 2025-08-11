import { useReducer, useContext, useEffect, useState } from "react";
import { clientContext, clientDispatchContext } from "./PerubahanProfilContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import { clientFirst } from "./PerubahanProfilService";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/loader";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function ClientProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [clientState, clientDispatch] = useReducer(appReducer, initialState);
  const id = useLocalStorage.get("clientId") ?? "";
  useEffect(() => {
    clientFirst(id).then((res) => {
      if (res.success) {
        clientDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      clientDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  if (clientState.loading) {
    return <Loader />;
  }

  if (clientState.error && clientState.error !== "Data Not Found") {
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

  return (
    <clientContext.Provider
      value={{
        clientState,
        clientAction: actionReducer,
      }}
    >
      <clientDispatchContext.Provider value={clientDispatch}>
        {children}
      </clientDispatchContext.Provider>
    </clientContext.Provider>
  );
}

export const useClient = () => {
  const context = useContext(clientContext);

  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }

  return context;
};

export const useClientDispatch = () => {
  const context = useContext(clientDispatchContext);

  if (!context) {
    throw new Error("useClientDispatch must be used within a ClientProvider");
  }

  return context;
};
