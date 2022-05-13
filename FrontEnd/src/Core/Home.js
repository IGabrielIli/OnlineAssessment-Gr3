import React from 'react';
import { Link } from 'react-router-dom'
import { DBType, fetchDynamicItem } from './Interact';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 1,
            loginErrorText: "",
            loginHide: false,
            registerHide: true,
            forgotHide: true,
        };
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onSignupClick = this.onSignupClick.bind(this);
        this.onBackToLoginClick = this.onBackToLoginClick.bind(this);
        this.onForgotClick = this.onForgotClick.bind(this);
    }
    onLoginClick(e) {
        this.setState({
            loginErrorText: "Invalid username/password combination"
        })
    }
    onSignupClick(e) {
        this.setState({
            loginHide: true,
            registerHide: false,
            forgotHide: true,
        })
    }
    onBackToLoginClick(e) {
        this.setState({
            loginHide: false,
            registerHide: true,
            forgotHide: true,
        })
    }
    onForgotClick(e) {
        this.setState({
            loginHide: true,
            registerHide: true,
            forgotHide: false,
        })
    }
    render() {
        var loginShown = this.state.loginHide ? "form form--hidden" : "form";
        var registerShown = this.state.registerHide ? "form form--hidden" : "form";
        var forgotShown = this.state.forgotHide ? "form form--hidden" : "form";
        return (
        <div>
            <div class="login__background" />
            <div class="login__container">
                <form class={loginShown} id="login">
                    <h1 class="form__title">{fetchDynamicItem(DBType.PROJECT_TITLE)}</h1>
                    <h3 class="login__text">Login</h3>
                    <div class="form__message form__message--error">{this.state.loginErrorText}</div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" autofocus placeholder="Username or email"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" autofocus placeholder="Password"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <button type="button" class="form__button" onClick={this.onLoginClick}>Login</button>
                    <p class="form__text">
                        <a class="form__link" onClick={this.onForgotClick}>Forgot your password?</a>
                    </p>
                    <p class="form__text">
                        <a class="form__link" onClick={this.onSignupClick}>Don't have an account? Sign up here</a>
                    </p>
                </form>
                <form class={registerShown} id="createAccount">
                    <h1 class="form__title">{fetchDynamicItem(DBType.PROJECT_TITLE)}</h1>
                    <h3 class="login__text">Create account</h3>
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
                    <button class="form__button" type="button">Sign Up</button>
                    <p class="form__text">
                        <a class="form__link" onClick={this.onBackToLoginClick}>Already have an account? Sign in</a>
                    </p>
                </form>
                <form class={forgotShown} id="forgotPassword">
                    <h1 class="form__title">{fetchDynamicItem(DBType.PROJECT_TITLE)}</h1>
                    <h3 class="login__text">Forgot password</h3>
                    <a class="form__link" onClick={this.onBackToLoginClick}>Back to login page</a>
                </form>
            </div>
        </div>
        );
    }
}

export default Home;
