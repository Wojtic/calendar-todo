import React from 'react';
import Navigation from './Navigation/Navigation';
import LoginForm from './Login/LoginForm';
import Home from './Home/Home';
import Calendar from './Calendar/Calendar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';


export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navigation />
        <main>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/login" render={(props) => (
              <LoginForm {...props} isRegister={false} />
            )} />
            <Route path="/register" render={(props) => (
              <LoginForm {...props} isRegister={true} />
            )} />
            <Route path='/calendar' exact component={Calendar} />
          </Switch>
        </main>
      </UserProvider>
    </Router >
  );
}

