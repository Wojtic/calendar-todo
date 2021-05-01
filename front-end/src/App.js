import React from 'react';
import { UserProvider } from './UserContext';
import Navigation from './Navigation';
import RouterSwitch from './RoutesSwitch';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navigation />
          <main>
            <RouterSwitch />
          </main>
        </div>
      </UserProvider>
    </Router >
  );
}

