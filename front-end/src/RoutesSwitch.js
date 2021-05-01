import React, { useContext } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import { UserContext } from './UserContext';

export default function RoutesSwitch() {
    const [user] = useContext(UserContext);
    console.log(user.user_name);
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            {user.user_name == null &&
                <>
                    <Route path="/login" render={(props) => (
                        <LoginForm {...props} isRegister={false} />
                    )} />
                    <Route path="/register" render={(props) => (
                        <LoginForm {...props} isRegister={true} />
                    )} />
                </>
            }
        </Switch>
    )
}
