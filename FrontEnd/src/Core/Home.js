import React from 'react';
import { Link } from 'react-router-dom'
import { DBType, fetchDynamicItem } from './Interact';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 1,
            loginErrorText: ""
        };
        this.onLoginClick = this.onLoginClick.bind(this);
    }
    onLoginClick(e) {
        this.setState({
            loginErrorText: "Invalid username/password combination"
        })
    }
    render() {
        return (
        <div>
            <div class="login__background" />
            <div class="login__container">
                <form class="form" id="login">
                    <h1 class="form__title">{fetchDynamicItem(DBType.PROJECT_TITLE)}</h1>
                    <h3 class="login__text">Log In</h3>
                    <div class="form__message form__message--error">{this.state.loginErrorText}</div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" autofocus placeholder="Username or email"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" autofocus placeholder="Password"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <button type="button" class="form__button" onClick={this.onLoginClick}>Log In</button>
                    <p class="form__text">
                        <a href="#" class="form__link">Forgot your password?</a>
                    </p>
                    <p class="form__text">
                        <a class="form__link" href="./" id="linkCreateAccount">Don't have an account? Sign up here</a>
                    </p>
                </form>
                <form class="form form--hidden" id="createAccount">
                    <h1 class="form__title">{fetchDynamicItem(DBType.PROJECT_TITLE)}</h1>
                    <h3 class="login__text">Create Account</h3>
                    <div class="form__message form__message--error"></div>
                    <div class="form__input-group">
                        <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="email" class="form__input" autofocus placeholder="Email Address"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" autofocus placeholder="Password"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" autofocus placeholder="Confirm password"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <button class="form__button" type="submit">Sign Up</button>
                    <p class="form__text">
                        <a class="form__link" href="./" id="linkLogin">Already have an account? Sign in</a>
                    </p>
                </form>
            </div>
        </div>
        );
    }
}

export default Home;
