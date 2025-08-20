import { useReducer, useContext, useEffect, useState } from "react";
import { konsepSptContext, konsepSptDispatchContext } from "./KonsepSptContext";
import { sptAll } from "./KonsepSptService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function KonsepSptProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [konsepSptState, konsepSptDispatch] = useReducer(
    appReducer,
    initialState
  );

  useEffect(() => {
    sptAll().then((res) => {
      if (res.success) {
        konsepSptDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      konsepSptDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);
  console.log("KonsepSptProvider", konsepSptState);
  if (konsepSptState.loading) {
    return <Loader />;
  }

  if (konsepSptState.error && konsepSptState.error !== "Data Not Found") {
    return <Error message={konsepSptState.error} />;
  }

  return (
    <konsepSptContext.Provider
      value={{ konsepSptState, documentAction: actionReducer }}
    >
      <konsepSptDispatchContext.Provider value={konsepSptDispatch}>
        {children}
      </konsepSptDispatchContext.Provider>
    </konsepSptContext.Provider>
  );
}

export const useKonsepSpt = () => {
  const context = useContext(konsepSptContext);

  if (!context) {
    throw new Error("useKonsepSpt must be used within a KonsepSptProvider");
  }

  return context;
};

export const useKonsepSptDispatch = () => {
  const context = useContext(konsepSptDispatchContext);

  if (!context) {
    throw new Error(
      "useKonsepSptDispatch must be used within a KonsepSptProvider"
    );
  }

  return context;
};
