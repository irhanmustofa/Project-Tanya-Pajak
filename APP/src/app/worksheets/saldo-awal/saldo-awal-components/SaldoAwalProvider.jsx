import { useReducer, useContext, useEffect, useState } from "react";
import { saldoAwalContext, saldoAwalDispatchContext } from "./SaldoAwalContext";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
import { saldoAwalGetBuku } from "./SaldoAwalService";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";

export default function SaldoAwalProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [coas, setCoas] = useState([]);

  useEffect(() => {
    saldoAwalGetBuku()
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
    <saldoAwalContext.Provider
      value={{ saldoAwalState: state, saldoAwalAction: actionReducer, coas }}
    >
      <saldoAwalDispatchContext.Provider value={dispatch}>
        {children}
      </saldoAwalDispatchContext.Provider>
    </saldoAwalContext.Provider>
  );
}

export const useSaldoAwal = () => {
  const context = useContext(saldoAwalContext);

  if (!context) {
    throw new Error("useSaldoAwal must be used within a SaldoAwalProvider");
  }

  return context;
};

export const useSaldoAwalDispatch = () => {
  const context = useContext(saldoAwalDispatchContext);

  if (!context) {
    throw new Error(
      "useSaldoAwalDispatch must be used within a SaldoAwalProvider"
    );
  }

  return context;
};
