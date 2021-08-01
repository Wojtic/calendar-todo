import React, { useState, FC } from "react";

interface TodoProps {
  checked: boolean;
  time: string;
  task: string;
}

const Todo: FC<TodoProps> = (props) => {
  const [checked, setChecked] = useState(props.checked);

  const formatDate = (date) => {
    // from YYYY-MM-DDT.... to DD.MM
    return date.substring(8, 10) + "." + date.substring(5, 7);
  };
  return (
    <div className="todo">
      <input
        type="checkbox"
        name="finished"
        defaultChecked={checked}
        onClick={() => setChecked(!checked)}
      />
      <p className="time">{formatDate(props.time)}</p>
      <p className="task">{props.task}</p>
      <i className="fa fa-ellipsis-v fa-lg"></i>
    </div>
  );
};

export default Todo;
