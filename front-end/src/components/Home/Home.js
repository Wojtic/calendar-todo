import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const Home = () => {
    const serverTest = async () => {
        let response = await fetch("get_groups", {
            method: "GET",
        });
        response = await response.json();
        console.log(response);
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Domov" }, void 0), _jsx("button", Object.assign({ onClick: serverTest }, { children: "Test serveru" }), void 0)] }, void 0));
};
export default Home;
