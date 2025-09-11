import { useReducer, useContext, useEffect, useState } from "react";
import {
  returPajakMasukanContext,
  returPajakMasukanDispatchContext,
} from "./ReturPajakMasukanContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
import { returPajakMasukanAll } from "./ReturPajakMasukanService";

export default function ReturPajakMasukanProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [returPajakMasukanState, returPajakMasukanDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    returPajakMasukanAll().then((res) => {
      if (res.success) {
        returPajakMasukanDispatch({
          type: actionReducer.SUCCESS,
          payload: res.data,
        });
      }

      returPajakMasukanDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });
  }, []);

  if (returPajakMasukanState.loading) {
    return <Loader />;
  }

  if (
    returPajakMasukanState.error &&
    returPajakMasukanState.error !== "Data Not Found"
  ) {
    return <Error message={returPajakMasukanState.error} />;
  }

  return (
    <returPajakMasukanContext.Provider
      value={{ returPajakMasukanState, pajakKeluaranAction: actionReducer }}
    >
      <returPajakMasukanDispatchContext.Provider
        value={returPajakMasukanDispatch}
      >
        {children}
      </returPajakMasukanDispatchContext.Provider>
    </returPajakMasukanContext.Provider>
  );
}

export const useReturPajakMasukan = () => {
  const context = useContext(returPajakMasukanContext);

  if (!context) {
    throw new Error(
      "useReturPajakMasukan must be used within a ReturPajakMasukanProvider"
    );
  }

  return context;
};

export const useReturPajakMasukanDispatch = () => {
  const context = useContext(returPajakMasukanDispatchContext);

  if (!context) {
    throw new Error(
      "useReturPajakMasukanDispatch must be used within a ReturPajakMasukanProvider"
    );
  }

  return context;
};
