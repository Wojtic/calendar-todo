import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from "react";
import { UserNameContext } from "../contexts/UserContext";
import { Redirect, Link } from "react-router-dom";
import "../../styles/css/style.css";
const LoginForm = (props) => {
    const { userName, setUserName } = useContext(UserNameContext);
    const red = "#F06450";
    const [redirect, setRedirect] = useState(null);
    const [user_name, set_user_name] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm && props.isRegister) {
            return alert("Passwords do not match!");
        }
        if (userName != null) {
            setRedirect("/");
        }
        if (props.isRegister) {
            let response = await fetch("register", {
                method: "POST",
                body: new FormData(e.currentTarget),
            });
            if (response.status === 200) {
                try {
                    const json_res = await response.json();
                    if (json_res.userExists) {
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
            let body = new URLSearchParams();
            body.append("email", email);
            body.append("password", password);
            let response = await fetch("login", {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: body,
            });
            if (response.status === 200) {
                const json_res = await response.json();
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
    };
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
