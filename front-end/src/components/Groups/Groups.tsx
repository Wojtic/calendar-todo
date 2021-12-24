import React, { useEffect, useContext, useState } from "react";
import { UserNameContext } from "../contexts/UserContext";

export default function Groups() {
  const { userName } = useContext(UserNameContext);
  const [groups, set_groups] = useState([]);

  const getGroups = async () => {
    if (!userName) return;
    let response = await fetch("get_groups", {
      method: "GET",
    });
    let data = await response.json();
    set_groups(data);

    console.log(groups);
  };
  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <button>Vytvořit skupinu</button>
    </div>
  );
}
