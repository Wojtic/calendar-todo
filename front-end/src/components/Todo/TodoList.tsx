import React from "react";
import Todo from "./Todo";
import PopUp from "./popUp";
import { UserNameContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";

export default function TodoList() {
  const { userName } = useContext(UserNameContext);
  const [popUp, set_popUp] = useState(false);
  const [todos, set_todos] = useState([]);

  const getTasks = async () => {
    if (!userName) return;
    let response = await fetch("get_tasks", {
      method: "GET",
    });
    let data = await response.json();
    set_todos(data);
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {popUp && (
        <PopUp
          close_handler={() => set_popUp(false)}
          update_tasks={() => getTasks()}
        />
      )}
      {userName && (
        <div className="todo_whole">
          <div className="todo_menu">
            <button id="create_task_btn" onClick={() => set_popUp(true)}>
              Vytvořit nový úkol
            </button>
          </div>
          <div className="todo_list">
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.task_id}
                  checked={false}
                  task={todo.task_name}
                  time={todo.task_date}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
