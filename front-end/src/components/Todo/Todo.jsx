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
      <p>{props.task}</p>
      <i className="fa fa-trash fa-lg"></i>
      <i class="fa fa-ellipsis-v fa-lg"></i>
    </div>
  );
};

export default Todo;
