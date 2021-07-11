import { createContext } from "react";
export const UserNameContext = createContext({
    userName: null,
    setUserName: (name) => console.warn("No user name provided"),
});
