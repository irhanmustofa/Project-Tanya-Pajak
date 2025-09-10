import { useReducer, useContext, useEffect, useState } from "react";
import {
  pajakMasukanContext,
  pajakMasukanDispatchContext,
} from "./PajakMasukanContext";
import { pajakMasukanAll } from "./PajakMasukanService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function PajakMasukanProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [pajakMasukanState, pajakMasukanDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    pajakMasukanAll().then((res) => {
      if (res.success) {
        pajakMasukanDispatch({
          type: actionReducer.SUCCESS,
          payload: res.data,
        });
      }

      pajakMasukanDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });
  }, []);

  if (pajakMasukanState.loading) {
    return <Loader />;
  }

  if (pajakMasukanState.error && pajakMasukanState.error !== "Data Not Found") {
    return <Error message={pajakMasukanState.error} />;
  }

  return (
    <pajakMasukanContext.Provider
      value={{ pajakMasukanState, pajakKeluaranAction: actionReducer }}
    >
      <pajakMasukanDispatchContext.Provider value={pajakMasukanDispatch}>
        {children}
      </pajakMasukanDispatchContext.Provider>
    </pajakMasukanContext.Provider>
  );
}

export const usePajakMasukan = () => {
  const context = useContext(pajakMasukanContext);

  if (!context) {
    throw new Error(
      "usePajakMasukan must be used within a PajakMasukanProvider"
    );
  }

  return context;
};

export const usePajakMasukanDispatch = () => {
  const context = useContext(pajakMasukanDispatchContext);

  if (!context) {
    throw new Error(
      "usePajakMasukanDispatch must be used within a PajakMasukanProvider"
    );
  }

  return context;
};
