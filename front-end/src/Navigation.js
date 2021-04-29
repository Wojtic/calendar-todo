import React, { Component } from 'react'
import "./styles/css/style.css"

export default class Navigation extends Component {
    state = { ulShown: false }

    render() {
        return (
            <nav>
                <img src="./icons/test.png" alt="<h3>Logo</h3>" height="90%" />
                <ul className={this.state.ulShown ? "nav_active" : null}>
                    <li><a href="index.html">Domů</a></li>
                    <li><a href="calendar.html">Kalendář</a></li>
                    <li><a href="login">Log in</a></li>
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