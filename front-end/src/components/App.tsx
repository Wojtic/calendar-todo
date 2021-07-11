import React from "react";
import Navigation from "./Navigation/Navigation";
import LoginForm from "./Login/LoginForm";
import Home from "./Home/Home";
import Calendar from "./Calendar/Calendar";
import Todo from "./Todo/TodoList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const [userName, setUserName] = React.useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ userName, setUserName }}>
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
            <Route path="/todo" exact component={Todo} />
          </Switch>
        </main>
      </UserContext.Provider>
    </Router>
  );
}
