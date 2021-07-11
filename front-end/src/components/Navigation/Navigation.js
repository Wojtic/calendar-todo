import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from "react";
import { UserNameContext } from "../contexts/UserContext";
import { NavLink } from "react-router-dom";
import "../../styles/css/style.css";
const Navigation = () => {
    const [ulShown, setUlShown] = useState(false);
    // eslint-disable-next-line
    const { userName, setUserName } = useContext(UserNameContext);
    return (_jsxs("nav", { children: [_jsx("img", { src: "./icons/test.png", alt: "<h3>Logo</h3>", height: "90%" }, void 0), _jsxs("ul", Object.assign({ className: ulShown ? "nav_active" : undefined }, { children: [_jsx("li", { children: _jsx(NavLink, Object.assign({ activeStyle: { textShadow: "0px 0px 1px white" }, to: "/", exact: true }, { children: "Dom\u016F" }), void 0) }, void 0), _jsx("li", { children: _jsx(NavLink, Object.assign({ activeStyle: { textShadow: "0px 0px 1px white" }, to: "/todo", exact: true }, { children: "Todo" }), void 0) }, void 0), _jsx("li", { children: _jsx(NavLink, Object.assign({ activeStyle: { textShadow: "0px 0px 1px white" }, to: "calendar" }, { children: "Kalend\u00E1\u0159" }), void 0) }, void 0), userName == null ? (_jsx("li", { children: _jsx(NavLink, Object.assign({ activeStyle: { textShadow: "0px 0px 1px white" }, to: "login" }, { children: "Log in" }), void 0) }, void 0)) : (_jsxs("li", { children: [_jsx("i", { className: "fa fa-user-circle fa-2x" }, void 0), _jsx("p", { children: userName }, void 0)] }, void 0))] }), void 0), _jsxs("div", Object.assign({ className: `burger ${ulShown ? "toggle" : null}`, onClick: () => {
                    setUlShown(!ulShown);
                } }, { children: [_jsx("div", { id: "burger1" }, void 0), _jsx("div", { id: "burger2" }, void 0), _jsx("div", { id: "burger3" }, void 0)] }), void 0)] }, void 0));
};
export default Navigation;
