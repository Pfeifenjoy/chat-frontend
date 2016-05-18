import React, { Component } from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { login } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import I18NComponent from "../components/I18NComponent";
import { arrayToObject, objectToArray } from "../util/data-types";
import Form from "../components/Form";


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
        const username = <Input 
            onChange={this.handleUsernameChange.bind(this)}
            error={this.state.errors.username}
            placeholder={ this.getWord("Username") }
            busy={this.state.loading}
        />;

        const password = <PasswordInput 
            onChange={this.handlePasswordChange.bind(this)}
            error={this.state.errors.password}
            busy={this.state.loading}
        />;
        const baseUrlInput = <BaseUrlInput />;

        let errorMessages = objectToArray(this.state.errors)

        let formFooter = <span>
            {this.getWord("Or") + " "}
            <Link to="register">{this.getWord("Register")}</Link>
        </span>
        //create the form
        const form = <Form
            onSubmit={this.handleSubmit.bind(this)}
            submitButtonText={this.getWord("Please sign in")}
            title={this.getWord("Login")}
            errors={errorMessages}
            footer={formFooter}
            loading={this.state.loading}
        >
            {username}
            {password}
            {baseUrlInput}
        </Form>


        return <div className="main">
            {form}
        </div>

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

