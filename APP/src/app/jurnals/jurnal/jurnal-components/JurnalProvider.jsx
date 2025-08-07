import { useReducer, useContext, useEffect, useState } from "react";
import { jurnalContext, jurnalDispatchContext } from "./JurnalContext";
import { jurnalAll } from "./JurnalService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import ErrorComponent from "@/components/custom/error";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";

export default function JurnalProvider({
  children,
  params,
  shouldFetch,
  onResult,
}) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [jurnalState, jurnalDispatch] = useReducer(appReducer, initialState);
  const [coas, setCoas] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    if (shouldFetch && params?.tahun && params?.masa) {
      jurnalDispatch({ type: actionReducer.RESET });
      setInternalLoading(true);
      jurnalAll(params).then((res) => {
        if (res.success) {
          jurnalDispatch({ type: actionReducer.SUCCESS, payload: res.data });
          onResult?.(res);
        } else {
          jurnalDispatch({ type: actionReducer.FAILURE, payload: res.message });
          onResult?.(res);
        }
        setInternalLoading(false);
      });

      coaAll().then((res) => {
        if (res.success) {
          setCoas(res.data);
        }
      });
    }
  }, [shouldFetch, params]);

  if (internalLoading) {
    return <Loader />;
  }

  if (jurnalState.error && jurnalState.error !== "Data Not Found") {
    return <ErrorComponent message={jurnalState.error} />;
  }

  return (
    <jurnalContext.Provider
      value={{
        jurnalState,
        jurnalAction: actionReducer,
        jurnalCoa: coas,
        params: {
          tahun: params?.tahun || "",
          masa: params?.masa || "",
        },
      }}
    >
      <jurnalDispatchContext.Provider value={jurnalDispatch}>
        {children}
      </jurnalDispatchContext.Provider>
    </jurnalContext.Provider>
  );
}

export const useJurnal = () => {
  const context = useContext(jurnalContext);

  if (!context) {
    throw new Error("useJurnal must be used within a JurnalProvider");
  }

  return context;
};

export const useJurnalDispatch = () => {
  const context = useContext(jurnalDispatchContext);

  if (!context) {
    throw new Error("useJurnalDispatch must be used within a JurnalProvider");
  }

  return context;
};
