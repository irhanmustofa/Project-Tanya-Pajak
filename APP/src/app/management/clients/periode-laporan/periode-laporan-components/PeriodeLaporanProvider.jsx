import { useReducer, useContext, useEffect, useState } from "react";
import {
  periodeLaporanContext,
  periodeLaporanDispatchContext,
} from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanContext";
import { periodeLaporanAll } from "@/app/management/clients/periode-laporan/periode-laporan-components/PeriodeLaporanService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function PeriodeLaporanProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [periodeLaporanState, periodeLaporanDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    periodeLaporanAll().then((res) => {
      if (res.success) {
        periodeLaporanDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      periodeLaporanDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);
  if (periodeLaporanState.loading) {
    return <Loader />;
  }

  if (periodeLaporanState.error && periodeLaporanState.error !== "Data Not Found") {
    return <Error message={periodeLaporanState.error} />;
  }

  return (
    <periodeLaporanContext.Provider
      value={{ periodeLaporanState, periodeLaporanAction: actionReducer, periodeLaporanGroup: groups }}
    >
      <periodeLaporanDispatchContext.Provider value={periodeLaporanDispatch}>
        {children}
      </periodeLaporanDispatchContext.Provider>
    </periodeLaporanContext.Provider>
  );
}

export const usePeriodeLaporan = () => {
  const context = useContext(periodeLaporanContext);
  if (!context) {
    throw new Error("usePeriodeLaporan must be used within a UserProvider");
  }

  return context;
};

export const usePeriodeLaporanDispatch = () => {
  const context = useContext(periodeLaporanDispatchContext);

  if (!context) {
    throw new Error("usePeriodeLaporanDispatch must be used within a CoaProvider");
  }

  return context;
};
