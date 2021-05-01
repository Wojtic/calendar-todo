import React, { Component } from 'react';
import { UserContext } from './UserContext'
import { NavLink } from 'react-router-dom';
import './styles/css/style.css';

export default class Navigation extends Component {
    state = { ulShown: false };
    static contextType = UserContext;

    render() {
        const [user] = this.context;
        return (
            <nav>
                <img src="./icons/test.png" alt="<h3>Logo</h3>" height="90%" />
                <ul className={this.state.ulShown ? "nav_active" : null}>
                    <li><NavLink activeStyle={{ textShadow: '0px 0px 1px white' }} to="/" exact>Domů</NavLink></li>
                    <li><NavLink activeStyle={{ textShadow: '0px 0px 1px white' }} to="calendar">Kalendář</NavLink></li>
                    {user.user_name == null ?
                        <li><NavLink activeStyle={{ textShadow: '0px 0px 1px white' }} to="login">Log in</NavLink></li>
                        :
                        <li><i className="fa fa-user-circle fa-2x"></i><p>{user.user_name}</p></li>
                    }
                </ul>
                <div className={`burger ${this.state.ulShown ? "toggle" : null}`} onClick={() => {
                    this.setState({ ulShown: !this.state.ulShown })
                }}>
                    <div id="burger1"></div>
                    <div id="burger2"></div>
                    <div id="burger3"></div>
                </div>
            </nav>
        )
    }
}