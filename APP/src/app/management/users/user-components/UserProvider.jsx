import { useReducer, useContext, useEffect, useState } from "react";
import { userContext, userDispatchContext } from "./UserContext";
import { userAll } from "./UserService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";
<<<<<<< HEAD
=======
import { groupAll } from "../../groups/group-components/GroupService";
>>>>>>> 2cd1356 (update-register)

export default function UserProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [userState, userDispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    userAll().then((res) => {
<<<<<<< HEAD
=======
      if (res.success) {
        userDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      userDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });

    groupAll().then((res) => {
>>>>>>> 2cd1356 (update-register)
      if (res.success) {
        userDispatch({ type: actionReducer.SUCCESS, payload: res.data });
      }

      userDispatch({ type: actionReducer.FAILURE, payload: res.message });
    });
  }, []);

  console.log("UserProvider", userState);

  if (userState.loading) {
    return <Loader />;
  }

  if (userState.error && userState.error !== "Data Not Found") {
    return <Error message={userState.error} />;
  }

  return (
    <userContext.Provider value={{ userState, userAction: actionReducer }}>
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
