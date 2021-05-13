import React, { useState } from "react";

const Todo = (props) => {
  const [checked, setChecked] = useState(props.checked);
  return (
    <div className="todo">
      <input
        type="checkbox"
        name="finished"
        defaultChecked={checked}
        onClick={() => setChecked(!checked)}
      />
      <p className="time">{props.time}</p>
      <p className="task">{props.task}</p>
      <i className="fa fa-trash fa-lg"></i>
      <i className="fa fa-ellipsis-v fa-lg"></i>
    </div>
  );
};

export default Todo;
