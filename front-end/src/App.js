import Navigation from './Navigation';
import LoginForm from './LoginForm';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
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
    </Router >
  );
}

