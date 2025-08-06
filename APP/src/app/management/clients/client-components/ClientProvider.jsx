import { useReducer, useContext, useEffect, useState } from "react";
import { clientContext, clientDispatchContext } from "./ClientContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import { clientAll } from "./ClientService";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/loader";
<<<<<<< HEAD
=======
import { groupAll } from "../../groups/group-components/GroupService";
import { serviceAll } from "../../service/service-components/ServiceService";
>>>>>>> 2cd1356 (update-register)

export default function ClientProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [clientState, clientDispatch] = useReducer(appReducer, initialState);
<<<<<<< HEAD
=======
  const [groups, setGroups] = useState([]);
  const [service, setService] = useState([]);
>>>>>>> 2cd1356 (update-register)

  useEffect(() => {
    clientAll().then((res) => {
      if (res.success) {
        clientDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      clientDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
<<<<<<< HEAD
=======

    groupAll().then((res) => {
      if (res.success) {
        setGroups(res.data);
      }
    });

    serviceAll().then((res) => {
      if (res.success) {
        setService(res.data);
      }
    });
>>>>>>> 2cd1356 (update-register)
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
<<<<<<< HEAD
=======
        clientGroup: groups,
        services: service,
>>>>>>> 2cd1356 (update-register)
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
