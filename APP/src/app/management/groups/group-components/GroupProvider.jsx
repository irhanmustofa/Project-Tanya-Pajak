import { useReducer, useContext, useEffect, useState } from "react";
import { groupContext, groupDispatchContext } from "./GroupContext";
import { groupAll } from "./GroupService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function GroupProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [groupState, groupDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    groupAll().then((res) => {
      if (res.success) {
        groupDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      groupDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  if (groupState.loading) {
    return <Loader />;
  }

  if (groupState.error && groupState.error !== "Data Not Found") {
    return <Error message={groupState.error} />;
  }

  return (
    <groupContext.Provider
      value={{ groupState, groupAction: actionReducer, groupGroup: groups }}
    >
      <groupDispatchContext.Provider value={groupDispatch}>
        {children}
      </groupDispatchContext.Provider>
    </groupContext.Provider>
  );
}

export const useGroup = () => {
  const context = useContext(groupContext);

  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }

  return context;
};

export const useGroupDispatch = () => {
  const context = useContext(groupDispatchContext);

  if (!context) {
    throw new Error("useGroupDispatch must be used within a GroupProvider");
  }

  return context;
};
