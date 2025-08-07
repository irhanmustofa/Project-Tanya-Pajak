import { useReducer, useContext, useEffect, useState } from "react";
import {
  coaHeadContext,
  coaHeadDispatchContext,
} from "@/app/management/coa/head/coa-head-components/CoaHeadContext";
import { coaHeadAll } from "@/app/management/coa/head/coa-head-components/CoaHeadService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function CoaHeadProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [coaHeadState, coaHeadDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    coaHeadAll().then((res) => {
      if (res.success) {
        coaHeadDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      coaHeadDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  if (coaHeadState.loading) {
    return <Loader />;
  }

  if (coaHeadState.error && coaHeadState.error !== "Data Not Found") {
    return <Error message={coaHeadState.error} />;
  }

  return (
    <coaHeadContext.Provider
      value={{
        coaHeadState,
        coaHeadAction: actionReducer,
        coaHeadGroup: groups,
      }}
    >
      <coaHeadDispatchContext.Provider value={coaHeadDispatch}>
        {children}
      </coaHeadDispatchContext.Provider>
    </coaHeadContext.Provider>
  );
}

export const useCoaHead = () => {
  const context = useContext(coaHeadContext);
  if (!context) {
    throw new Error("useCoaHead must be used within a CoaHeadProvider");
  }

  return context;
};

export const useCoaHeadDispatch = () => {
  const context = useContext(coaHeadDispatchContext);

  if (!context) {
    throw new Error("useCoaHeadDispatch must be used within a CoaHeadProvider");
  }

  return context;
};
