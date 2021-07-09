import React, { useState, useContext, FC } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { NavLink } from "react-router-dom";
import "../../styles/css/style.css";

const Navigation: FC = () => {
  const [ulShown, setUlShown] = useState(false);
  const [user]: any = useContext(UserContext);

  return (
    <nav>
      <img src="./icons/test.png" alt="<h3>Logo</h3>" height="90%" />
      <ul className={ulShown ? "nav_active" : undefined}>
        <li>
          <NavLink
            activeStyle={{ textShadow: "0px 0px 1px white" }}
            to="/"
            exact
          >
            Domů
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ textShadow: "0px 0px 1px white" }}
            to="/todo"
            exact
          >
            Todo
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ textShadow: "0px 0px 1px white" }}
            to="calendar"
          >
            Kalendář
          </NavLink>
        </li>
        {user.user_name == null ? (
          <li>
            <NavLink
              activeStyle={{ textShadow: "0px 0px 1px white" }}
              to="login"
            >
              Log in
            </NavLink>
          </li>
        ) : (
          <li>
            <i className="fa fa-user-circle fa-2x"></i>
            <p>{user.user_name}</p>
          </li>
        )}
      </ul>
      <div
        className={`burger ${ulShown ? "toggle" : null}`}
        onClick={() => {
          setUlShown(!ulShown);
        }}
      >
        <div id="burger1"></div>
        <div id="burger2"></div>
        <div id="burger3"></div>
      </div>
    </nav>
  );
};

export default Navigation;
