import React, { Component } from 'react';
import './styles/css/style.css';

export default class LoginForm extends Component {
    render() {
        return (
            <form action="#" id="login_form">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Napiš email" required />

                <label htmlFor="password">Heslo: </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Napiš heslo"
                    required
                    minLength="4"
                    maxLength="20"
                />

                <button type="submit">Přihlásit se</button>
                <p>Nemáš účet? <a href="register">Vytvořit účet.</a></p>
            </form>
        )
    }
}
