import React, { Component } from 'react';
import './styles/css/style.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', user_name: '', password_confirm: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.password_input = null;
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.props.isRegister) {
                if (this.state.password !== this.state.password_confirm) {
                    this.password_input.setCustomValidity("Passwords do not match!")
                } else {
                    this.password_input.setCustomValidity("")
                }
            }

        });
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

                {this.props.isRegister === true ?
                    <>
                        <input
                            type="password"
                            name="password_confirm"
                            placeholder="Zopakuj heslo"
                            required
                            minLength="4"
                            maxLength="20"
                            value={this.state.password_confirm}
                            onChange={this.handleChange}
                            ref={element => { this.password_input = element }}
                        />
                        <button type="submit">Vytvořit účet</button>
                        <p>Máš účet? <a href="login">Přihlásit se</a></p>
                    </>
                    :
                    <>
                        <button type="submit">Přihlásit se</button>
                        <p>Nemáš účet? <a href="register">Vytvořit účet.</a></p>
                    </>
                }

            </form>
        )
    }
}
