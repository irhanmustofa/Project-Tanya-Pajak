import { useReducer, useContext } from "react";
import { dialogContext, dialogDispatchContext } from "@/dialogs/DialogContext";
import DialogInfo from "@/dialogs/DialogInfo";
import DialogDelete from "@/dialogs/DialogDelete";
import DialogLogout from "@/dialogs/DialogLogout";
import DialogDeleteSome from "@/dialogs/DialogDeleteSome";
import {
  dialogInitial,
  dialogReducer,
  dialogAction,
} from "@/dialogs/DialogReducer";

export default function DialogProvider({ children }) {
  const [dialogState, dialogDispatch] = useReducer(
    dialogReducer,
    dialogInitial
  );

  const value = {
    dialogState,
    dialogAction,
    DialogInfo,
    DialogLogout,
    DialogDelete,
    DialogDeleteSome,
  };

  return (
    <dialogContext.Provider value={value}>
      <dialogDispatchContext.Provider value={dialogDispatch}>
        {children}
      </dialogDispatchContext.Provider>
    </dialogContext.Provider>
  );
}

export const useDialog = () => {
  const context = useContext(dialogContext);

  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
};

export const useDialogDispatch = () => {
  const context = useContext(dialogDispatchContext);

  if (context === undefined) {
    throw new Error("useDialogDispatch must be used within a DialogProvider");
  }

  return context;
};
