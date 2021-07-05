import React from "react";

const Home = () => {
  const serverTest = async () => {
    let response = await fetch("create_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: "group-curr",
        name: "Super úkol",
        date: "2021-02-20 11:54:25",
        description: "Nějaký fajn description",
      }),
    });
    response = await response.json();
    console.log(response);
  };

  return (
    <>
      <h1>Domov</h1>
      <button onClick={serverTest}>Test serveru</button>
    </>
  );
};

export default Home;
