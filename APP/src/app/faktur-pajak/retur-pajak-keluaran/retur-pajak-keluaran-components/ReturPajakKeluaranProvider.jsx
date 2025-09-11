import { useReducer, useContext, useEffect, useState } from "react";
import {
  returPajakKeluaranContext,
  returPajakKeluaranDispatchContext,
} from "./ReturPajakKeluaranContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
import { returPajakKeluaranAll } from "./ReturPajakKeluaranService";

export default function ReturPajakKeluaranProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [returPajakKeluaranState, returPajakKeluaranDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    returPajakKeluaranAll().then((res) => {
      if (res.success) {
        returPajakKeluaranDispatch({
          type: actionReducer.SUCCESS,
          payload: res.data,
        });
      }

      returPajakKeluaranDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });
  }, []);

  if (returPajakKeluaranState.loading) {
    return <Loader />;
  }

  if (
    returPajakKeluaranState.error &&
    returPajakKeluaranState.error !== "Data Not Found"
  ) {
    return <Error message={returPajakKeluaranState.error} />;
  }

  return (
    <returPajakKeluaranContext.Provider
      value={{ returPajakKeluaranState, pajakKeluaranAction: actionReducer }}
    >
      <returPajakKeluaranDispatchContext.Provider
        value={returPajakKeluaranDispatch}
      >
        {children}
      </returPajakKeluaranDispatchContext.Provider>
    </returPajakKeluaranContext.Provider>
  );
}

export const useReturPajakKeluaran = () => {
  const context = useContext(returPajakKeluaranContext);

  if (!context) {
    throw new Error(
      "useReturPajakKeluaran must be used within a ReturPajakKeluaranProvider"
    );
  }

  return context;
};

export const useReturPajakKeluaranDispatch = () => {
  const context = useContext(returPajakKeluaranDispatchContext);

  if (!context) {
    throw new Error(
      "useReturPajakKeluaranDispatch must be used within a ReturPajakKeluaranProvider"
    );
  }

  return context;
};
