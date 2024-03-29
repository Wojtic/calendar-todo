import React, { useState, FC } from "react";

interface Props {
  close_handler;
  update_tasks;
}
const PopUp: FC<Props> = (props) => {
  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [date, set_date] = useState(new Date().toISOString().split("T")[0]);
  const [time, set_time] = useState(new Date().toTimeString().substring(0, 5));

  const formatDate = (date: string, time: string): string => {
    return `${date} ${time}:00`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      date: formatDate(date, time),
      owner: "curr",
      name: name,
      description: description,
    };
    fetch("create_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    props.update_tasks();
    props.close_handler();
  };

  return (
    <>
      <div id="overlay"></div>
      <div className="todo_popUp">
        <i className="fa fa-times fa-2x" onClick={props.close_handler}></i>
        <form action="#" id="todo_popUp_form" onSubmit={handleSubmit}>
          <div className="form_section">
            <input
              type="text"
              name="name"
              placeholder=" "
              required
              minLength={1}
              value={name}
              onChange={(e) => {
                set_name(e.target.value);
              }}
            />
            <label className="floating-label">Úkol</label>
          </div>
          <div className="form_section">
            <input
              type="text"
              name="description"
              placeholder=" "
              minLength={1}
              value={description}
              onChange={(e) => {
                set_description(e.target.value);
              }}
            />
            <label htmlFor="description" className="floating-label">
              Popis
            </label>
          </div>
          <div className="form_section">
            <label htmlFor="date" id="date-label">
              Do
            </label>
            <div id="todo_date">
              <input
                type="date"
                name="date"
                required
                value={date}
                onChange={(e) => {
                  set_date(e.target.value);
                }}
              />
              <input
                type="time"
                name="time"
                required
                value={time}
                onChange={(e) => {
                  set_time(e.target.value);
                }}
              />
            </div>
          </div>
          <button type="submit">Vytvořit úkol</button>
        </form>
      </div>
    </>
  );
};
export default PopUp;
