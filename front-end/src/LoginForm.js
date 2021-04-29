import React, { Component } from 'react';
import './styles/css/style.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', user_name: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form action="#" id="login_form" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Napiš email" value={this.state.email} onChange={this.handleChange} required />

                <label htmlFor="password">Heslo: </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Napiš heslo"
                    required
                    minLength="4"
                    maxLength="20"
                    value={this.state.password}
                    onChange={this.handleChange}
                />

                <button type="submit">Přihlásit se</button>
                <p>Nemáš účet? <a href="register">Vytvořit účet.</a></p>
            </form>
        )
    }
}
