import { useReducer, useContext, useEffect, useState } from "react";
import {
  masterAssetContext,
  masterAssetDispatchContext,
} from "./MasterAssetContext";
import {
  masterAssetAll,
  golonganAsset,
  jenisAsset,
  jenisHarta,
  kategoriAsset,
  metodePenyusutan,
} from "./MasterAssetService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";

export default function masterAssetProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [masterAssetState, masterAssetDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [coas, setCoas] = useState([]);
  const [jenisAssetState, setJenisAssetState] = useState([]);
  const [kategoriAssetState, setKategoriAssetState] = useState([]);
  const [golonganAssetState, setGolonganAssetState] = useState([]);
  const [jenisHartaState, setJenisHartaState] = useState([]);
  const [metodePenyusutanState, setMetodePenyusutanState] = useState([]);

  useEffect(() => {
    jenisAsset().then((res) => {
      if (res.success) {
        setJenisAssetState(res.data);
      }
    });

    kategoriAsset().then((res) => {
      if (res.success) {
        setKategoriAssetState(res.data);
      }
    });

    golonganAsset().then((res) => {
      if (res.success) {
        setGolonganAssetState(res.data);
      }
    });

    jenisHarta().then((res) => {
      if (res.success) {
        setJenisHartaState(res.data);
      }
    });

    metodePenyusutan().then((res) => {
      if (res.success) {
        setMetodePenyusutanState(res.data);
      }
    });

    masterAssetAll().then((res) => {
      if (res.success) {
        masterAssetDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      masterAssetDispatch({
        type: actionReducer.FAILURE,
        payload: res.message,
      });
    });

    coaAll().then((res) => {
      if (res.success) {
        setCoas(res.data);
      } else {
        masterAssetDispatch({
          type: actionReducer.FAILURE,
          payload: res.message,
        });
      }
    });
  }, []);

  if (masterAssetState.loading) {
    return <Loader />;
  }

  if (masterAssetState.error && masterAssetState.error !== "Data Not Found") {
    return <Error message={masterAssetState.error} />;
  }

  return (
    <masterAssetContext.Provider
      value={{
        masterAssetState,
        coas,
        masterAssetAction: actionReducer,
        jenisAssetState: jenisAssetState,
        kategoriAssetState: kategoriAssetState,
        golonganAssetState: golonganAssetState,
        jenisHartaState: jenisHartaState,
        metodePenyusutanState: metodePenyusutanState,
      }}
    >
      <masterAssetDispatchContext.Provider value={masterAssetDispatch}>
        {children}
      </masterAssetDispatchContext.Provider>
    </masterAssetContext.Provider>
  );
}

export const useMasterAsset = () => {
  const context = useContext(masterAssetContext);

  if (!context) {
    throw new Error("useMasterAsset must be used within a masterAssetProvider");
  }

  return context;
};

export const useMasterAssetDispatch = () => {
  const context = useContext(masterAssetDispatchContext);

  if (!context) {
    throw new Error(
      "useMasterAssetDispatch must be used within a masterAssetProvider"
    );
  }

  return context;
};
