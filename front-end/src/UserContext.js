import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState({ user_name: null });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}