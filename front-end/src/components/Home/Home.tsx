import React from "react";

const Home = () => {
  const serverTest = async () => {};

  return (
    <>
      <h1>Domov</h1>
      <button onClick={serverTest}>Test serveru</button>
    </>
  );
};

export default Home;
