import React, { useEffect } from "react";
import Navigation from "./Navigation/Navigation";
import LoginForm from "./Login/LoginForm";
import Home from "./Home/Home";
import Calendar from "./Calendar/Calendar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserNameContext } from "./contexts/UserContext";
import TodoList from "./Todo/TodoList";

export default function App() {
  const [userName, setUserName] = React.useState(null);
  useEffect(() => {
    if (!userName && sessionStorage.getItem("user_name") != null) {
      setUserName(sessionStorage.getItem("user_name"));
    } else if (userName) {
      sessionStorage.setItem("user_name", userName);
    }
  }, [userName]);

  return (
    <Router>
      <UserNameContext.Provider value={{ userName, setUserName }}>
        <Navigation />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              render={(props) => <LoginForm {...props} isRegister={false} />}
            />
            <Route
              path="/register"
              render={(props) => <LoginForm {...props} isRegister={true} />}
            />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/todo" exact component={TodoList} />
          </Switch>
        </main>
      </UserNameContext.Provider>
    </Router>
  );
}
