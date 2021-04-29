import Navigation from './Navigation';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Route path="/login" component={LoginForm} />
      </main>
    </Router >
  );
}

