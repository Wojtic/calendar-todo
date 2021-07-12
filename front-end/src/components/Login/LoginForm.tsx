import React, { useState, useContext, FC } from "react";
import { UserNameContext } from "../contexts/UserContext";
import { Redirect, Link } from "react-router-dom";
import "../../styles/css/style.css";

interface LoginProps {
  isRegister: boolean;
}
const LoginForm: FC<LoginProps> = (props) => {
  const { userName, setUserName }: any = useContext(UserNameContext);
  const red = "#F06450";

  const [redirect, setRedirect] = useState(null);
  const [user_name, set_user_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm && props.isRegister) {
      return alert("Passwords do not match!");
    }
    if (userName != null) {
      setRedirect("/");
    }
    if (props.isRegister) {
      let body = new URLSearchParams();
      body.append("username", user_name);
      body.append("email", email);
      body.append("password", password);
      let response = await fetch("register", {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: body,
      });
      if (response.status === 200) {
        try {
          const json_res: { userExists: boolean } = await response.json();
          if (json_res.userExists) {
            alert("Uživatel s tímto emailem už existuje.");
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
          } else {
            setRedirect("/login");
          }
        } catch (e) {}
      } else {
        console.log("HTTP error: " + response.status);
      }
    } else {
      let body = new URLSearchParams();
      body.append("email", email);
      body.append("password", password);
      let response = await fetch("login", {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: body,
      });
      if (response.status === 200) {
        const json_res: { user_name: string } = await response.json();
        setUserName(json_res.user_name);
        setRedirect("/");
      } else if (response.status === 401) {
        setPassword("");
      } else {
        console.log("HTTP error: " + response.status);
      }
    }
  };

  const handleChange = (e) => {
    e.target.style.backgroundColor = e.target.checkValidity() ? "unset" : red;
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <form action="#" id="login_form" onSubmit={handleSubmit}>
      {props.isRegister && (
        <>
          <label htmlFor="username">Přezdívka:</label>
          <input
            type="text"
            name="username"
            placeholder="Napiš přezdívku"
            required
            minLength={2}
            maxLength={10}
            value={user_name}
            onChange={(e) => {
              set_user_name(e.target.value);
              handleChange(e);
            }}
          />
        </>
      )}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Napiš email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          handleChange(e);
        }}
        required
      />

      <label htmlFor="password">Heslo: </label>
      <input
        type="password"
        name="password"
        placeholder="Napiš heslo"
        required
        minLength={4}
        maxLength={20}
        value={password}
        onChange={(e) => {
          handleChange(e);
          setPassword(e.target.value);
        }}
      />

      {props.isRegister ? (
        <>
          <input
            type="password"
            name="password_confirm"
            placeholder="Zopakuj heslo"
            required
            minLength={4}
            maxLength={20}
            value={passwordConfirm}
            onChange={(e) => {
              handleChange(e);
              setPasswordConfirm(e.target.value);
            }}
          />
          <button type="submit">Vytvořit účet</button>
          <p>
            Máš účet? <Link to="/login">Přihlásit se</Link>
          </p>
        </>
      ) : (
        <>
          <button type="submit">Přihlásit se</button>
          <p>
            Nemáš účet? <Link to="/register">Vytvořit účet.</Link>
          </p>
        </>
      )}
    </form>
  );
};

export default LoginForm;
