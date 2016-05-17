import React, { Component } from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { login } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import PasswordInput from "../components/PasswordInput";
import UsernameInput from "../components/UsernameInput";
import I18NComponent from "../components/I18NComponent";


export default class Login extends I18NComponent {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            submitFailed: false,
            loading: false
        }
    }

    render() {
        //generate the input fields
        const username = <UsernameInput 
            onChange={this.handleUsernameChange.bind(this)}
            busy={this.state.loading}
        />;
        const password = <PasswordInput 
            onChange={this.handlePasswordChange.bind(this)}
            wrongPassword={this.state.authenticationFailed}
            busy={this.state.loading}
        />;
        const baseUrlInput = <BaseUrlInput />;

        //create the form
        const form = <form
                acceptCharset="UTF-8"
                role="form"
                method="post"
                onSubmit={this.handleSubmit.bind(this)}
            >
            <fieldset>
                {username}
                {password}
                {baseUrlInput}
                <input 
                    className="btn btn-lg btn-success btn-block"
                    type="submit"
                    value={this.state.loading ? this.getWord("Loading...") : this.getWord("Login")}
                    disabled={this.state.loading}
                />
            </fieldset>
        </form>;

        //create the panel
        const head = <div className="panel-heading">
            <h3 className="panel-title">{this.getWord("Please sign in")}</h3>
        </div>;
        const body = <div className="panel-body">
            {form}
            <span>
                {this.getWord("Or") + " "}
                <Link to="register">{this.getWord("Register")}</Link>
            </span>
        </div>;

        return <div className="panel panel-default">
            {head}
            {body}
        </div>;

    }
    handleSubmit(oEvent) {
        oEvent.preventDefault();
        this.setState({
            loading: true
        });

        let { username, password } = this.state;
        login(username, password)
        .fail(error => {
            this.setState({
                authenticationFailed: true,
                loading: false
            });
        });
    }

    handleUsernameChange(username) {
        this.setState({
            username
        })
    }

    handlePasswordChange(password) {
        this.setState({
            password
        });
    }
}

