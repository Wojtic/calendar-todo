import React, { useState, createContext, FC } from "react";

export const UserContext = createContext({user_name: null});

export const UserProvider: FC = (props) => {
  const [user, setUser] = useState({ user_name: null });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
