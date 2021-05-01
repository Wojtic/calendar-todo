import React, { Component } from 'react';
import { UserContext } from './UserContext';
import { Redirect, Link } from 'react-router-dom';
import './styles/css/style.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', username: '', password_confirm: '', redirect: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.password_input = null;
        this.password_input_confirm = null;
        this.red = "#F06450";
    }

    static contextType = UserContext;

    async handleSubmit(e) {
        e.preventDefault();
        if (this.props.isRegister) {
            let response = await fetch('register', {
                method: 'POST',
                body: new URLSearchParams([...new FormData(e.target).entries()])
            });
            if (response.status === 200) {
                try {
                    response = await response.json();

                    if (response.userExists) {
                        alert("Uživatel s tímto emailem už existuje.")
                        this.setState({ email: '', password: '', password_confirm: '' })
                    }
                } catch (e) { }
                this.setState({ redirect: '/login' })
            }
            else { console.log('HTTP error: ' + response.status); }
        } else {
            let response = await fetch('login', {
                method: 'POST',
                body: new URLSearchParams([...new FormData(e.target).entries()])
            });
            if (response.status === 200) {
                const [user, setUser] = this.context;
                response = await response.json();
                setUser({ user_name: response.user_name });

                this.setState({ redirect: '/' })
            }
            else if (response.status === 401) {
                this.password_input.style.backgroundColor = this.red;
                this.setState({ password: '', password_confirm: '' });
            }
            else { console.log('HTTP error: ' + response.status); }
        }
    }

    handleChange(e) {
        e.target.style.backgroundColor = e.target.checkValidity() ? "inherit" : this.red;
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.props.isRegister) {
                e.target.style.backgroundColor = e.target.checkValidity() ? "inherit" : this.red;
                if (this.state.password !== this.state.password_confirm) {
                    this.password_input_confirm.setCustomValidity("Passwords do not match!");
                    this.password_input_confirm.style.backgroundColor = this.red;
                } else {
                    this.password_input_confirm.setCustomValidity("");
                    this.password_input_confirm.style.backgroundColor = "inherit";
                }
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form action="#" id="login_form" onSubmit={this.handleSubmit}>
                {this.props.isRegister &&
                    <>
                        <label htmlFor="username">Přezdívka:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Napiš přezdívku"
                            required
                            minLength="2"
                            maxLength="10"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </>
                }
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
                    ref={element => { this.password_input = element }}
                />

                {this.props.isRegister ?
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
                            ref={element => { this.password_input_confirm = element }}
                        />
                        <button type="submit">Vytvořit účet</button>
                        <p>Máš účet? <Link to="/login">Přihlásit se</Link></p>
                    </>
                    :
                    <>
                        <button type="submit">Přihlásit se</button>
                        <p>Nemáš účet? <Link to="/register">Vytvořit účet.</Link></p>
                    </>
                }
            </form>
        )
    }
}
