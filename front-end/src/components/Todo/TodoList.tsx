import React from "react";
import Todo from "./Todo";
import PopUp from "./popUp";
import { useState } from "react";

export default function TodoList() {
  const [popUp, set_popUp] = useState(false);
  return (
    <>
      {popUp && <PopUp close_handler={() => set_popUp(false)} />}
      <div className="todo_whole">
        <div className="todo_menu">
          <button id="create_task_btn" onClick={() => set_popUp(true)}>
            Vytvořit nový úkol
          </button>
        </div>
        <div className="todo_list">
          <Todo checked={true} task={"Lorem ipsum dolor sit"} time={"42.13."} />
        </div>
      </div>
    </>
  );
}
