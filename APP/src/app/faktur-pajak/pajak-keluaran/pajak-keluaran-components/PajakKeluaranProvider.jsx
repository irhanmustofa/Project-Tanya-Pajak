import { useReducer, useContext, useEffect, useState } from "react";
import {
  pajakKeluaranContext,
  pajakKeluaranDispatchContext,
} from "./PajakKeluaranContext";
import { pajakKeluaranAll } from "./PajakKeluaranService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function PajakKeluaranProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [pajakKeluaranState, pajakKeluaranDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    pajakKeluaranAll().then((res) => {
      if (res.success) {
        pajakKeluaranDispatch({
          type: actionReducer.SUCCESS,
          payload: res.data,
        });
      }

      pajakKeluaranDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });
  }, []);

  if (pajakKeluaranState.loading) {
    return <Loader />;
  }

  if (
    pajakKeluaranState.error &&
    pajakKeluaranState.error !== "Data Not Found"
  ) {
    return <Error message={pajakKeluaranState.error} />;
  }

  return (
    <pajakKeluaranContext.Provider
      value={{ pajakKeluaranState, pajakKeluaranAction: actionReducer }}
    >
      <pajakKeluaranDispatchContext.Provider value={pajakKeluaranDispatch}>
        {children}
      </pajakKeluaranDispatchContext.Provider>
    </pajakKeluaranContext.Provider>
  );
}

export const usePajakKeluaran = () => {
  const context = useContext(pajakKeluaranContext);

  if (!context) {
    throw new Error(
      "usePajakKeluaran must be used within a PajakKeluaranProvider"
    );
  }

  return context;
};

export const usePajakKeluaranDispatch = () => {
  const context = useContext(pajakKeluaranDispatchContext);

  if (!context) {
    throw new Error(
      "usePajakKeluaranDispatch must be used within a PajakKeluaranProvider"
    );
  }

  return context;
};
