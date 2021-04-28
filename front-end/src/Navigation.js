import React from 'react'
import "./styles/css/style.css"

export default function Navigation() {
    return (
        <nav>
            <img src="./icons/test.png" alt="<h3>Logo</h3>" height="90%" />
            <ul>
                <li><a href="index.html">Domů</a></li>
                <li><a href="calendar.html">Kalendář</a></li>
                <li><a href="login.html">Log in</a></li>
            </ul>
            <div class="burger">
                <div id="burger1"></div>
                <div id="burger2"></div>
                <div id="burger3"></div>
            </div>
        </nav>
    )
}
