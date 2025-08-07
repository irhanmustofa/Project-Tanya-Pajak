import {
  useReducer,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { bukuContext, bukuDispatchContext } from "./BukuContext";
import { bukuAll } from "./BukuService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import ErrorComponent from "@/components/custom/error";
import { coaAll } from "@/app/management/coa/master/coa-components/CoaService";

export default function BukuProvider({
  children,
  params,
  shouldFetch,
  onResult,
}) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [bukuState, bukuDispatch] = useReducer(appReducer, initialState);
  const [coas, setCoas] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Memoize params untuk menghindari reference change
  const memoizedParams = useMemo(
    () => ({
      buku: params?.buku || "",
    }),
    [params?.buku]
  );

  // Stabilize onResult callback
  const stableOnResult = useCallback(
    (result) => {
      onResult?.(result);
    },
    [onResult]
  );

  useEffect(() => {
    // Tambahkan guard untuk mencegah multiple calls
    if (!shouldFetch || !memoizedParams.buku || hasInitialized) {
      return;
    }

    console.log("BukuProvider: Starting data fetch", {
      shouldFetch,
      params: memoizedParams,
      hasInitialized,
    });

    const fetchData = async () => {
      try {
        bukuDispatch({ type: actionReducer.RESET });
        setInternalLoading(true);
        setHasInitialized(true);

        // Fetch buku data
        const bukuResponse = await bukuAll(memoizedParams);
        // const bukuResponse = {
        //   success: true,
        //   data: [
        //     {
        //       _id: "1",
        //       name: "Buku 1",
        //       description: "Deskripsi Buku 1",
        //     },
        //     {
        //       _id: "2",
        //       name: "Buku 2",
        //       description: "Deskripsi Buku 2",
        //     },
        //   ],
        // };

        if (bukuResponse.success) {
          bukuDispatch({
            type: actionReducer.SUCCESS,
            payload: bukuResponse.data,
          });
          stableOnResult(bukuResponse);
        } else {
          bukuDispatch({
            type: actionReducer.FAILURE,
            payload: bukuResponse.message,
          });
          stableOnResult(bukuResponse);
        }

        // Fetch COA data independently
        const coaResponse = await coaAll();
        if (coaResponse.success) {
          setCoas(coaResponse.data);
        }
      } catch (error) {
        console.error("BukuProvider fetch error:", error);
        bukuDispatch({
          type: actionReducer.FAILURE,
          payload: error.message || "Failed to fetch data",
        });
        stableOnResult({ success: false, message: error.message });
      } finally {
        setInternalLoading(false);
      }
    };

    fetchData();
  }, [
    shouldFetch,
    memoizedParams.buku,
    actionReducer,
    stableOnResult,
    hasInitialized,
  ]);

  // Reset hasInitialized when params change
  useEffect(() => {
    setHasInitialized(false);
  }, [memoizedParams.buku]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      bukuState,
      bukuAction: actionReducer,
      jurnalCoa: coas,
      params: memoizedParams,
    }),
    [bukuState, actionReducer, coas, memoizedParams]
  );

  if (internalLoading) {
    return <Loader />;
  }

  if (bukuState.error && bukuState.error !== "Data Not Found") {
    return <ErrorComponent message={bukuState.error} />;
  }

  return (
    <bukuContext.Provider value={contextValue}>
      <bukuDispatchContext.Provider value={bukuDispatch}>
        {children}
      </bukuDispatchContext.Provider>
    </bukuContext.Provider>
  );
}

export const useBuku = () => {
  const context = useContext(bukuContext);

  if (!context) {
    throw new Error("useBuku must be used within a BukuProvider");
  }

  return context;
};

export const useBukuDispatch = () => {
  const context = useContext(bukuDispatchContext);

  if (!context) {
    throw new Error("useBukuDispatch must be used within a BukuProvider");
  }

  return context;
};
