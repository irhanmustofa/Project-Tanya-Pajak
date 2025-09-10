import { useReducer, useContext, useEffect, useState } from "react";
import { userContext, userDispatchContext } from "./UserContext";
import { permissionAll, userAll } from "./UserService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function UserProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [userState, userDispatch] = useReducer(appReducer, initialState);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    userAll().then((res) => {
      if (res.success) {
        userDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      userDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });

    permissionAll().then((res) => {
      if (res.success) {
        setPermissions(res.data);
      }
    });
  }, []);

  if (userState.loading) {
    return <Loader />;
  }

  if (userState.error && userState.error !== "Data Not Found") {
    return <Error message={userState.error} />;
  }

  return (
    <userContext.Provider
      value={{ userState, userAction: actionReducer, permissions }}
    >
      <userDispatchContext.Provider value={userDispatch}>
        {children}
      </userDispatchContext.Provider>
    </userContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const useUserDispatch = () => {
  const context = useContext(userDispatchContext);

  if (!context) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }

  return context;
};
