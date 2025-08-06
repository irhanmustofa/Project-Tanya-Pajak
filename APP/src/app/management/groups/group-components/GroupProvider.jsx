import { useReducer, useContext, useEffect } from "react";
import { groupContext, groupDispatchContext } from "./GroupContext";
import { groupAll } from "./GroupService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/loader";

export default function GroupProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [groupState, groupDispatch] = useReducer(appReducer, initialState);

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
    return (
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center text-3xl font-semibold">
          An error has occurred
        </div>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  const groupAction = actionReducer;

  return (
    <groupContext.Provider value={{ groupState, groupAction }}>
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
