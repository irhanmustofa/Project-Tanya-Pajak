import { useReducer, useContext, useEffect, useState } from "react";
import {
  jenisAssetContext,
  jenisAssetDispatchContext,
} from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetContext";
import { jenisAssetAll } from "@/app/management/coa/jenis-asset/jenis-asset-components/JenisAssetService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function JenisAssetProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [jenisAssetState, jenisAssetDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    jenisAssetAll().then((res) => {
      if (res.success) {
        jenisAssetDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      jenisAssetDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);
  if (jenisAssetState.loading) {
    return <Loader />;
  }

  if (jenisAssetState.error && jenisAssetState.error !== "Data Not Found") {
    return <Error message={jenisAssetState.error} />;
  }

  return (
    <jenisAssetContext.Provider
      value={{
        jenisAssetState,
        jenisAssetAction: actionReducer,
        jenisAssetGroup: groups,
      }}
    >
      <jenisAssetDispatchContext.Provider value={jenisAssetDispatch}>
        {children}
      </jenisAssetDispatchContext.Provider>
    </jenisAssetContext.Provider>
  );
}

export const useJenisAsset = () => {
  const context = useContext(jenisAssetContext);
  if (!context) {
    throw new Error("useJenisAsset must be used within a JenisAssetProvider");
  }

  return context;
};

export const useJenisAssetDispatch = () => {
  const context = useContext(jenisAssetDispatchContext);

  if (!context) {
    throw new Error(
      "useJenisAssetDispatch must be used within a JenisAssetProvider"
    );
  }

  return context;
};
