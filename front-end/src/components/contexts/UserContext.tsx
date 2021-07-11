import { useContext, createContext } from "react";

export type UserContextType = {
  userName: string;
  setUserName: (userName: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userName: null,
  setUserName: (name) => console.warn("No user name provided"),
});

export const useUser = () => useContext(UserContext);
