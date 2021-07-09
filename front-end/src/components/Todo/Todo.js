import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const Todo = (props) => {
    const [checked, setChecked] = useState(props.checked);
    return (_jsxs("div", Object.assign({ className: "todo" }, { children: [_jsx("input", { type: "checkbox", name: "finished", defaultChecked: checked, onClick: () => setChecked(!checked) }, void 0), _jsx("p", Object.assign({ className: "time" }, { children: props.time }), void 0), _jsx("p", Object.assign({ className: "task" }, { children: props.task }), void 0), _jsx("i", { className: "fa fa-trash fa-lg" }, void 0), _jsx("i", { className: "fa fa-ellipsis-v fa-lg" }, void 0)] }), void 0));
};
export default Todo;
