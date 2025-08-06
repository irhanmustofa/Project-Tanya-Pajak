import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LucideCircleCheck,
  LucideCircleX,
  LucideTriangleAlert,
  LucideInfo,
  LucideCircleHelp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import HttpRequest from "@/api/http-request";
import { authEndpoint } from "@/app/auth/auth-endpoint";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState, useTransition } from "react";

export const DialogInfoPage = ({ onClose }) => {
  const dispatch = useDialogDispatch();
  const { dialogAction, dialogState } = useDialog();
  const { isOpen, status, message, title } = dialogState;

  if (dialogState.dialog !== "info") return null;

  const hanldeClose = () => {
    dispatch({ type: dialogAction.RESET });
    if (onClose) onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={hanldeClose}>
      <AlertDialogContent className="border border-white">
        <div className="grid grid-rows-3 grid-flow-col gap-2">
          <div className="row-span-3 m-0 p-0 flex items-center">
            {status === "success" ? (
              <LucideCircleCheck className="text-green-500" size={100} />
            ) : status === "error" ? (
              <LucideCircleX className="text-red-500" size={100} />
            ) : status === "warning" ? (
              <LucideTriangleAlert className="text-yellow-500" size={100} />
            ) : status === "info" ? (
              <LucideInfo className="text-blue-500" size={100} />
            ) : null}
          </div>
          <div className="ms-4 col-span-12 row-span-2">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">{title}</AlertDialogTitle>
              <AlertDialogDescription className="text-lg font-semibold">
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="col-span-12 flex justify-end">
            <AlertDialogFooter className={"flex justify-center items-end"}>
              <AlertDialogAction onClick={hanldeClose}>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DialogDeletePage = ({ onClose }) => {
  const dispatch = useDialogDispatch();
  const { dialogState, dialogAction } = useDialog();
  const [isPending, startTransition] = useTransition();

  if (dialogState.dialog !== "delete" && dialogState.dialog !== "info")
    return null;

  const handleDeleteData = async () => {
    startTransition(async () => {
      await HttpRequest.method("DELETE")
        .url(dialogState.url)
        .send()
        .then((response) => {
          if (response.success) {
            dispatch({
              type: dialogAction.DIALOG_INFO,
              payload: {
                isOpen: true,
                title: "Delete Data",
                message: "Delete data successfully.",
                status: "success",
              },
            });

            setTimeout(() => handleClose(true), 100);
          } else {
            dispatch({
              type: dialogAction.DIALOG_INFO,
              payload: {
                isOpen: true,
                title: "Delete Data Failed",
                message: response.message ?? "Failed to delete data.",
                status: "error",
              },
            });

            handleClose(false);
          }
        });
    });
  };

  const handleClose = (success = false) => {
    dispatch({ type: dialogAction.RESET });
    onClose(success);
  };

  let component;
  dialogState.dialog === "delete"
    ? (component = (
        <AlertDialog open={dialogState.isOpen}>
          <AlertDialogContent className="border border-white">
            <div className="grid grid-rows-3 grid-flow-col gap-2">
              <div className="row-span-3 m-0 p-0 flex items-center">
                <LucideCircleHelp className="text-red-500" size={100} />
              </div>
              <div className="ms-4 col-span-12 row-span-2">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    {dialogState.title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg font-semibold">
                    {dialogState.message}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <div className="col-span-12 flex justify-end">
                <AlertDialogFooter className="flex justify-center items-end">
                  <AlertDialogAction
                    pending={isPending}
                    onClick={handleDeleteData}
                  >
                    Yes, Continue Delete
                  </AlertDialogAction>
                  <AlertDialogCancel onClick={() => handleClose(false)}>
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ))
    : dialogState.dialog === "info"
    ? (component = <DialogInfoPage />)
    : null;

  return component;
};

export const DialogDeleteSomePage = ({ onClose }) => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDialogDispatch();
  const { dialogState, dialogAction } = useDialog();

  if (dialogState.dialog !== "delete_some" && dialogState.dialog !== "info")
    return null;

  const handleDeleteSomeData = async () => {
    setIsPending(true);

    try {
      const response = await HttpRequest.method("POST")
        .url(dialogState.url)
        .body(dialogState.data)
        .send();

      if (response.success) {
        dispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Delete Data",
            message: "Delete some data successfully.",
            status: "success",
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 100);

        if (onClose) onClose();
        setIsPending(false);
      } else {
        setTimeout(() => {
          dispatch({
            type: dialogAction.DIALOG_INFO,
            payload: {
              isOpen: true,
              title: "Delete Data",
              message: "Failed to delete data.",
              status: "error",
            },
          });
        }, 100);

        if (onClose) onClose();
        setIsPending(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOnClose = () => {
    dispatch({ type: dialogAction.RESET });
    setIsPending(false);
    if (onClose) onClose();
  };

  let component;
  dialogState.dialog === "delete_some"
    ? (component = (
        <AlertDialog open={dialogState.isOpen}>
          <AlertDialogContent className="border border-white">
            <div className="grid grid-rows-3 grid-flow-col gap-2">
              <div className="row-span-3 m-0 p-0 flex items-center">
                <LucideCircleHelp className="text-red-500" size={100} />
              </div>
              <div className="ms-4 col-span-12 row-span-2">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    {dialogState.title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg font-semibold">
                    {dialogState.message}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <div className="col-span-12 flex justify-end">
                <AlertDialogFooter className="flex justify-center items-end">
                  <AlertDialogAction
                    pending={isPending}
                    onClick={handleDeleteSomeData}
                  >
                    Yes, Continue Delete
                  </AlertDialogAction>
                  <AlertDialogCancel onClick={handleOnClose}>
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ))
    : dialogState.dialog === "info"
    ? (component = <DialogInfoPage />)
    : null;

  return component;
};

export const DialogLogoutPage = () => {
  const { dialogState, dialogAction } = useDialog();
  const dispatch = useDialogDispatch();
  const navigate = useNavigate();

  if (dialogState.dialog !== "logout") return null;

  const onClose = () => {
    dispatch({ type: dialogAction.RESET });
  };

  const handleLogout = () => {
    try {
      (async () => {
<<<<<<< HEAD
        await HttpRequest.method("POST").url(authEndpoint.logout).send();
        useLocalStorage.reset();
        dispatch({
          type: dialogAction.DIALOG_INFO,
          payload: {
            isOpen: true,
            title: "Logout",
            message: "Logout successful",
            status: "success",
          },
        });
        setTimeout(() => {
          dispatch({ type: dialogAction.RESET });
          navigate("/");
        }, 1000);
=======
        await HttpRequest.method("GET").url(authEndpoint.logout).send();
        useLocalStorage.reset();
        dispatch({ type: dialogAction.RESET });
        navigate("/");
>>>>>>> fd410b4 (update-register)
      })();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AlertDialog open={dialogState.isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border border-white">
        <div className="grid grid-rows-3 grid-flow-col gap-2">
          <div className="row-span-3 m-0 p-0 flex items-center">
            <LucideCircleHelp className="text-yellow-400" size={100} />
          </div>
          <div className="ms-4 col-span-12 row-span-2">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                {dialogState.title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg font-semibold">
                {dialogState.message}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="col-span-12 flex justify-end">
            <AlertDialogFooter className={"flex justify-center items-end"}>
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Yes, Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
