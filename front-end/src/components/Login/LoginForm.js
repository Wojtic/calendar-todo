var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { Redirect, Link } from "react-router-dom";
import "../../styles/css/style.css";
const LoginForm = (props) => {
    const [userName, setUserName] = useUser();
    const red = "#F06450";
    const [redirect, setRedirect] = useState(null);
    const [user_name, set_user_name] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (password !== passwordConfirm && props.isRegister) {
            return alert("Passwords do not match!");
        }
        if (userName != null) {
            setRedirect("/");
        }
        if (props.isRegister) {
            let response = yield fetch("register", {
                method: "POST",
                body: new URLSearchParams([...new FormData(e.currentTarget).entries()]),
            });
            if (response.status === 200) {
                try {
                    response = yield response.json();
                    if (response.userExists) {
                        alert("Uživatel s tímto emailem už existuje.");
                        setEmail("");
                        setPassword("");
                        setPasswordConfirm("");
                    }
                    else {
                        setRedirect("/login");
                    }
                }
                catch (e) { }
            }
            else {
                console.log("HTTP error: " + response.status);
            }
        }
        else {
            let response = yield fetch("login", {
                method: "POST",
                body: new URLSearchParams([...new FormData(e.target).entries()]),
            });
            if (response.status === 200) {
                const json_res = yield response.json();
                setUserName(json_res.user_name);
                setRedirect("/");
            }
            else if (response.status === 401) {
                setPassword("");
            }
            else {
                console.log("HTTP error: " + response.status);
            }
        }
    });
    const handleChange = (e) => {
        e.target.style.backgroundColor = e.target.checkValidity() ? "unset" : red;
    };
    if (redirect) {
        return _jsx(Redirect, { to: redirect }, void 0);
    }
    return (_jsxs("form", Object.assign({ action: "#", id: "login_form", onSubmit: handleSubmit }, { children: [props.isRegister && (_jsxs(_Fragment, { children: [_jsx("label", Object.assign({ htmlFor: "username" }, { children: "P\u0159ezd\u00EDvka:" }), void 0), _jsx("input", { type: "text", name: "username", placeholder: "Napi\u0161 p\u0159ezd\u00EDvku", required: true, minLength: 2, maxLength: 10, value: user_name, onChange: (e) => {
                            set_user_name(e.target.value);
                            handleChange(e);
                        } }, void 0)] }, void 0)), _jsx("label", Object.assign({ htmlFor: "email" }, { children: "Email:" }), void 0), _jsx("input", { type: "email", name: "email", placeholder: "Napi\u0161 email", value: email, onChange: (e) => {
                    setEmail(e.target.value);
                    handleChange(e);
                }, required: true }, void 0), _jsx("label", Object.assign({ htmlFor: "password" }, { children: "Heslo: " }), void 0), _jsx("input", { type: "password", name: "password", placeholder: "Napi\u0161 heslo", required: true, minLength: 4, maxLength: 20, value: password, onChange: (e) => {
                    handleChange(e);
                    setPassword(e.target.value);
                } }, void 0), props.isRegister ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "password", name: "password_confirm", placeholder: "Zopakuj heslo", required: true, minLength: 4, maxLength: 20, value: passwordConfirm, onChange: (e) => {
                            handleChange(e);
                            setPasswordConfirm(e.target.value);
                        } }, void 0), _jsx("button", Object.assign({ type: "submit" }, { children: "Vytvo\u0159it \u00FA\u010Det" }), void 0), _jsxs("p", { children: ["M\u00E1\u0161 \u00FA\u010Det? ", _jsx(Link, Object.assign({ to: "/login" }, { children: "P\u0159ihl\u00E1sit se" }), void 0)] }, void 0)] }, void 0)) : (_jsxs(_Fragment, { children: [_jsx("button", Object.assign({ type: "submit" }, { children: "P\u0159ihl\u00E1sit se" }), void 0), _jsxs("p", { children: ["Nem\u00E1\u0161 \u00FA\u010Det? ", _jsx(Link, Object.assign({ to: "/register" }, { children: "Vytvo\u0159it \u00FA\u010Det." }), void 0)] }, void 0)] }, void 0))] }), void 0));
};
export default LoginForm;
