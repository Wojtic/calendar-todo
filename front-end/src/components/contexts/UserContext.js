import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext } from "react";
export const UserContext = createContext({ user_name: null });
export const UserProvider = (props) => {
    const [user, setUser] = useState({ user_name: null });
    return (_jsx(UserContext.Provider, Object.assign({ value: [user, setUser] }, { children: props.children }), void 0));
};
