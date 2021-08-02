import React, { useState, FC } from "react";

interface TodoProps {
  checked: boolean;
  time: string;
  task: string;
  id: number;
  update_tasks;
}

const Todo: FC<TodoProps> = (props) => {
  const [checked, setChecked] = useState(props.checked);

  const formatDate = (date) => {
    // from YYYY-MM-DDT.... to DD.MM
    return date.substring(8, 10) + "." + date.substring(5, 7);
  };

  const removeTask = async () => {
    let response = await fetch("remove_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: props.id }),
    });
    if (response.ok) {
      props.update_tasks();
    }
  };

  return (
    <div className="todo">
      <input
        type="checkbox"
        name="finished"
        defaultChecked={checked}
        onClick={() => {
          removeTask();
          return setChecked(!checked);
        }}
      />
      <p className="time">{formatDate(props.time)}</p>
      <p className="task">{props.task}</p>
      <i className="fa fa-ellipsis-v fa-lg"></i>
    </div>
  );
};

export default Todo;
