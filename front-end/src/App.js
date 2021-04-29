import Navigation from './Navigation';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Route path="/login" render={(props) => (
          <LoginForm {...props} isRegister={false} />
        )} />
        <Route path="/register" render={(props) => (
          <LoginForm {...props} isRegister={true} />
        )} />
      </main>
    </Router >
  );
}

