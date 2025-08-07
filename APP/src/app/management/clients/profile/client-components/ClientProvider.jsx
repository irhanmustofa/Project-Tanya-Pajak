import { useReducer, useContext, useEffect, useState } from "react";
import { clientContext, clientDispatchContext } from "./ClientContext";
import { clientAll } from "./ClientService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function ClientProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [clientState, clientDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);
  const [periodeLaporan, setPeriodeLaporan] = useState([]);

  useEffect(() => {
    clientAll().then((res) => {
      if (res.success) {
        clientDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      clientDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  // if (clientState.loading) {
  //   return <Loader />;
  // }

  if (clientState.error && clientState.error !== "Data Not Found") {
    return <Error message={clientState.error} />;
  }

  return (
    <clientContext.Provider
      value={{
        clientState,
        clientAction: actionReducer,
        clientGroup: groups,
        clientPeriodeLaporan: periodeLaporan,
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
