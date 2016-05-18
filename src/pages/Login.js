import React, { Component } from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { login } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import PasswordInput from "../components/PasswordInput";
import UsernameInput from "../components/UsernameInput";
import I18NComponent from "../components/I18NComponent";
import { arrayToObject, objectToArray } from "../util/data-types";


export default class Login extends I18NComponent {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {},
            loading: false
        }
    }

    render() {
        //generate the input fields
        const username = <UsernameInput 
            onChange={this.handleUsernameChange.bind(this)}
            error={this.state.errors.username}
            busy={this.state.loading}
        />;

        const password = <PasswordInput 
            onChange={this.handlePasswordChange.bind(this)}
            error={this.state.errors.password}
            busy={this.state.loading}
        />;
        const baseUrlInput = <BaseUrlInput />;

        let errorMessages = objectToArray(this.state.errors)
        .map((error, i) => {
            return <div 
                className="alert alert-danger"
                key={i}
            >
                <strong>{error.errorMessage}</strong>
            </div>;
        })

        

        //create the form
        const form = <form
                acceptCharset="UTF-8"
                role="form"
                method="post"
                onSubmit={this.handleSubmit.bind(this)}
            >
                {errorMessages}
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
        .fail(response => {
            let errors = [{
                errorMessage: this.getWord("Could not reach the server.")
            }];
            try {
                errors = arrayToObject(JSON.parse(response.responseText).errors, "field");
            } catch(e) { }
            this.setState({
                loading: false,
                errors
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

