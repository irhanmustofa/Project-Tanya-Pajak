import { useReducer, useContext, useEffect, useState } from "react";
import {
  jurnalUmumContext,
  jurnalUmumDispatchContext,
} from "./JurnalUmumContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
import { jurnalUmumGetBuku } from "./JurnalUmumService";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";

export default function JurnalUmumProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [coas, setCoas] = useState([]);

  useEffect(() => {
    jurnalUmumGetBuku()
      .then((res) => {
        if (res.success) {
          dispatch({ type: actionReducer.SUCCESS, payload: res.data });
        } else {
          dispatch({ type: actionReducer.FAILURE, payload: res.message });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionReducer.FAILURE,
          payload: error.message || "Failed to fetch users",
        });
      });
    coaAll().then((res) => {
      if (res.success) {
        setCoas(res.data);
      }
    });
  }, []);

  if (state.loading) {
    return <Loader />;
  }

  if (state.error && state.error !== "Data Not Found") {
    return <Error message={state.error} />;
  }

  return (
    <jurnalUmumContext.Provider
      value={{ jurnalUmumState: state, jurnalUmumAction: actionReducer, coas }}
    >
      <jurnalUmumDispatchContext.Provider value={dispatch}>
        {children}
      </jurnalUmumDispatchContext.Provider>
    </jurnalUmumContext.Provider>
  );
}

export const useJurnalUmum = () => {
  const context = useContext(jurnalUmumContext);

  if (!context) {
    throw new Error("useJurnalUmum must be used within a JurnalUmumProvider");
  }

  return context;
};

export const useJurnalUmumDispatch = () => {
  const context = useContext(jurnalUmumDispatchContext);

  if (!context) {
    throw new Error(
      "useJurnalUmumDispatch must be used within a JurnalUmumProvider"
    );
  }

  return context;
};
