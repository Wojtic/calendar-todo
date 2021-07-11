import { createContext } from "react";

export type UserContextType = {
  userName: string;
  setUserName: (userName: string) => void;
};

export const UserNameContext = createContext<UserContextType>({
  userName: null,
  setUserName: (name) => console.warn("No user name provided"),
});
