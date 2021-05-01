import React from 'react';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext';


export default function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
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
            </Switch>
          </main>
        </div>
      </UserProvider>

    </Router >
  );
}

