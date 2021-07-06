import React from "react";

const Home = () => {
  const serverTest = async () => {
    let response = await fetch("get_groups", {
      method: "GET",
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
