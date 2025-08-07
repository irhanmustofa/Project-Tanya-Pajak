import { useReducer, useContext, useEffect, useState } from "react";
import { userContext, userDispatchContext } from "./UserContext";
import { userAll } from "./UserService";
import { useAppReducer } from "@/hooks/use-app-reducer";
import Loader from "@/components/custom/loader";
import Error from "@/components/custom/error";

export default function UserProvider({ children }) {
  const { initialState, actionReducer, appReducer } = useAppReducer();
  const [userState, userDispatch] = useReducer(appReducer, initialState);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    userAll()
      .then((res) => {
        if (res.success) {
          const currentUserEmail = localStorage.getItem("email");
          const filteredUsers = res.data.filter(
            (user) => user.email !== currentUserEmail
          );

          userDispatch({ type: actionReducer.SUCCESS, payload: filteredUsers });
        } else {
          userDispatch({ type: actionReducer.FAILURE, payload: res.message });
        }
      })
      .catch((error) => {
        userDispatch({
          type: actionReducer.FAILURE,
          payload: error.message || "Failed to fetch users",
        });
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
      value={{ userState, userAction: actionReducer, userGroup: groups }}
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
