import { useContext, createContext } from "react";
export const UserContext = createContext({
    userName: null,
    setUserName: (name) => console.warn("No user name provided"),
});
export const useUser = () => useContext(UserContext);
