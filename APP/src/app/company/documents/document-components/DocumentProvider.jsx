import { useReducer, useContext, useEffect, useState } from "react";
import { documentContext, documentDispatchContext } from "./DocumentContext";
import { documentAll } from "./DocumentService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function DocumentProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [documentState, documentDispatch] = useReducer(
    appReducer,
    initialState
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    documentAll().then((res) => {
      if (res.success) {
        documentDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      documentDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  if (documentState.loading) {
    return <Loader />;
  }

  if (documentState.error && documentState.error !== "Data Not Found") {
    return <Error message={documentState.error} />;
  }

  return (
    <documentContext.Provider
      value={{ documentState, documentAction: actionReducer }}
    >
      <documentDispatchContext.Provider value={documentDispatch}>
        {children}
      </documentDispatchContext.Provider>
    </documentContext.Provider>
  );
}

export const useDocument = () => {
  const context = useContext(documentContext);

  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }

  return context;
};

export const useDocumentDispatch = () => {
  const context = useContext(documentDispatchContext);

  if (!context) {
    throw new Error(
      "useDocumentDispatch must be used within a DocumentProvider"
    );
  }

  return context;
};
