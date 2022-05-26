import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { DBType, fetchDynamicItem } from './Interact';

let signupDetails = ['', '', '', '', '', '']
let loginDetails = ['', '']
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 1,
            loginErrorText: "",
            loginHide: false,
            registerHide: true,
            forgotHide: true,
            signupErrorText: "",
            signupSuccessText: "",
        };
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onSignupClick = this.onSignupClick.bind(this);
        this.onSignupSubmitClick = this.onSignupSubmitClick.bind(this);
        this.onBackToLoginClick = this.onBackToLoginClick.bind(this);
        this.onForgotClick = this.onForgotClick.bind(this);
        this.onSignupInputChange = this.onSignupInputChange.bind(this);
        this.onLoginInputChange = this.onLoginInputChange.bind(this);
    }
    onLoginInputChange(e, id) {
        loginDetails[id] = e.target.value
    }
    onSignupInputChange(e, id) {
        signupDetails[id] = e.target.value
    }
    onLoginClick(e) {
        var url = "https://localhost:7299/api/User/login?userName=" + loginDetails[0] + "&userPassword=" + loginDetails[1]
        fetch(url)
            .then(response => response.text())
            .then(data => {
                if (data == "-1" || data.length != 40) {
                    this.setState({
                        signupErrorText: "",
                        signupSuccessText: "",
                        loginErrorText: "Invalid username/password combination"})
                } else {
                    document.cookie = data + ";";
                    window.location.href = 'Dashboard';
                }
            });
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
    onSignupSubmitClick(e) {
        var details = {
            "UserId": "",
            "UserName": signupDetails[0],
            "UserRealName": signupDetails[1],
            "UserEmail": signupDetails[2],
            "UserPasswordMD5": signupDetails[3],
            "UserJobTitle": signupDetails[5]
        };
        if (signupDetails[3] != signupDetails[4]) {
            this.setState({
                signupSuccessText: "",
                loginErrorText: "",
                signupErrorText: "Confirm password is not matching"
            });
            return;
        }
        if (signupDetails[0] == '') {
            this.setState({
                signupSuccessText: "",
                loginErrorText: "",
                signupErrorText: "Username is a required field"
            });
            return;
        }
        if (signupDetails[1] == '') {
            this.setState({
                signupSuccessText: "",
                loginErrorText: "",
                signupErrorText: "Real name is a required field"
            });
            return;
        }
        if (signupDetails[2] == '') {
            this.setState({
                signupSuccessText: "",
                loginErrorText: "",
                signupErrorText: "Email is a required field"
            });
            return;
        }
        if (signupDetails[3] == '') {
            this.setState({
                signupSuccessText: "",
                loginErrorText: "",
                signupErrorText: "Password is a required field"
            });
            return;
        }
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('https://localhost:7299/api/User', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
        this.setState({
            loginHide: false,
            registerHide: true,
            forgotHide: true,
            signupSuccessText: "Registered successfully",
            signupErrorText: "",
            loginErrorText: ""
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
                    <div class="form__message form__message--success">{this.state.signupSuccessText}</div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" onChange={ (e) => this.onLoginInputChange(e, 0) } autofocus placeholder="Username"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" onChange={ (e) => this.onLoginInputChange(e, 1) } autofocus placeholder="Password"/>
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
                    <div class="form__message form__message--error">{this.state.signupErrorText}</div>
                    <div class="form__message form__message--error"></div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 0) } autofocus placeholder="Username*"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 1) } autofocus placeholder="Real name*"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="email" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 2) } autofocus placeholder="Email Address*"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="text" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 5) } autofocus placeholder="Job title"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 3) } autofocus placeholder="Password*"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <div class="form__input-group">
                        <input type="password" class="form__input" onChange={ (e) => this.onSignupInputChange(e, 4) } autofocus placeholder="Confirm password*"/>
                        <div class="form__input-error-message"></div>
                    </div>
                    <button class="form__button" type="button" onClick={this.onSignupSubmitClick}>Sign Up</button>
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
