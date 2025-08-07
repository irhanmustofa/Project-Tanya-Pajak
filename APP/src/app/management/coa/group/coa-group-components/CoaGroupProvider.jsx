import { useReducer, useContext, useEffect, useState } from "react";
import {
  coaGroupContext,
  coaGroupDispatchContext,
} from "@/app/management/coa/group/coa-group-components/CoaGroupContext";
import { coaGroupAll } from "@/app/management/coa/group/coa-group-components/CoaGroupService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function CoaGroupProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [coaGroupState, coaGroupDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    coaGroupAll().then((res) => {
      if (res.success) {
        coaGroupDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      coaGroupDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);
  if (coaGroupState.loading) {
    return <Loader />;
  }

  if (coaGroupState.error && coaGroupState.error !== "Data Not Found") {
    return <Error message={coaGroupState.error} />;
  }

  return (
    <coaGroupContext.Provider
      value={{
        coaGroupState,
        coaGroupAction: actionReducer,
        coaGroupGroup: groups,
      }}
    >
      <coaGroupDispatchContext.Provider value={coaGroupDispatch}>
        {children}
      </coaGroupDispatchContext.Provider>
    </coaGroupContext.Provider>
  );
}

export const useCoaGroup = () => {
  const context = useContext(coaGroupContext);
  if (!context) {
    throw new Error("useCoaGroup must be used within a CoaGroupProvider");
  }

  return context;
};

export const useCoaGroupDispatch = () => {
  const context = useContext(coaGroupDispatchContext);

  if (!context) {
    throw new Error(
      "useCoaGroupDispatch must be used within a CoaGroupProvider"
    );
  }

  return context;
};
