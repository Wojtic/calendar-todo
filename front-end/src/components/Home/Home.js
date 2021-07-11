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
const Home = () => {
    const serverTest = () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield fetch("get_groups", {
            method: "GET",
        });
        response = yield response.json();
        console.log(response);
    });
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Domov" }, void 0), _jsx("button", Object.assign({ onClick: serverTest }, { children: "Test serveru" }), void 0)] }, void 0));
};
export default Home;
