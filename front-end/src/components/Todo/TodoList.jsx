import React from "react";
import Todo from "./Todo.jsx";

export default function TodoList() {
  return (
    <div>
      <Todo checked={true} task={"Lorem ipsum dolor sit"} />
    </div>
  );
}
