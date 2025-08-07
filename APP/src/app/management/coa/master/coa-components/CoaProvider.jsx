import { useReducer, useContext, useEffect, useState } from "react";
import {
  coaContext,
  coaDispatchContext,
} from "@/app/management/coa/master/coa-components/CoaContext";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function CoaProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [coaState, coaDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    coaAll().then((res) => {
      if (res.success) {
        coaDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      coaDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);
  if (coaState.loading) {
    return <Loader />;
  }

  if (coaState.error && coaState.error !== "Data Not Found") {
    return <Error message={coaState.error} />;
  }

  return (
    <coaContext.Provider
      value={{
        coaState,
        coaAction: actionReducer,
        coaGroup: groups,
      }}
    >
      <coaDispatchContext.Provider value={coaDispatch}>
        {children}
      </coaDispatchContext.Provider>
    </coaContext.Provider>
  );
}

export const useCoa = () => {
  const context = useContext(coaContext);
  if (!context) {
    throw new Error("useCoa must be used within a UserProvider");
  }

  return context;
};

export const useCoaDispatch = () => {
  const context = useContext(coaDispatchContext);

  if (!context) {
    throw new Error("useCoaDispatch must be used within a CoaProvider");
  }

  return context;
};
