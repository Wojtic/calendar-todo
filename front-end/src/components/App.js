import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Navigation from "./Navigation/Navigation";
import LoginForm from "./Login/LoginForm";
import Home from "./Home/Home";
import Calendar from "./Calendar/Calendar";
import Todo from "./Todo/TodoList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserNameContext } from "./contexts/UserContext";
export default function App() {
    const [userName, setUserName] = React.useState(null);
    return (_jsx(Router, { children: _jsxs(UserNameContext.Provider, Object.assign({ value: { userName, setUserName } }, { children: [_jsx(Navigation, {}, void 0), _jsx("main", { children: _jsxs(Switch, { children: [_jsx(Route, { path: "/", exact: true, component: Home }, void 0), _jsx(Route, { path: "/login", render: (props) => _jsx(LoginForm, Object.assign({}, props, { isRegister: false }), void 0) }, void 0), _jsx(Route, { path: "/register", render: (props) => _jsx(LoginForm, Object.assign({}, props, { isRegister: true }), void 0) }, void 0), _jsx(Route, { path: "/calendar", exact: true, component: Calendar }, void 0), _jsx(Route, { path: "/todo", exact: true, component: Todo }, void 0)] }, void 0) }, void 0)] }), void 0) }, void 0));
}
