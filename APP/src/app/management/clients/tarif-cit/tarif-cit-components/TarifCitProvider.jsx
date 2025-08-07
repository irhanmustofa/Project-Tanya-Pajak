import { useReducer, useContext, useEffect, useState } from "react";
import {
  tarifCitContext,
  tarifCitDispatchContext,
} from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitContext";
import { tarifCitAll } from "@/app/management/clients/tarif-cit/tarif-cit-components/TarifCitService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function TarifCitProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [tarifCitState, tarifCitDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    tarifCitAll().then((res) => {
      if (res.success) {
        tarifCitDispatch({
          type: actionReducer.SUCCESS,
          payload: res.data,
        });
      }

      tarifCitDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });
  }, []);
  if (tarifCitState.loading) {
    return <Loader />;
  }

  if (tarifCitState.error && tarifCitState.error !== "Data Not Found") {
    return <Error message={tarifCitState.error} />;
  }

  return (
    <tarifCitContext.Provider
      value={{
        tarifCitState,
        tarifCitAction: actionReducer,
        tarifCitGroup: groups,
      }}
    >
      <tarifCitDispatchContext.Provider value={tarifCitDispatch}>
        {children}
      </tarifCitDispatchContext.Provider>
    </tarifCitContext.Provider>
  );
}

export const useTarifCit = () => {
  const context = useContext(tarifCitContext);
  if (!context) {
    throw new Error("useTarifCit must be used within a TarifCitProvider");
  }

  return context;
};

export const useTarifCitDispatch = () => {
  const context = useContext(tarifCitDispatchContext);

  if (!context) {
    throw new Error(
      "useTarifCitDispatch must be used within a TarifCitProvider"
    );
  }

  return context;
};
