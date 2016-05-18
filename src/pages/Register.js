import React from "react";
import BaseUrlInput from "../components/BaseUrlInput";
import I18NComponent from "../components/I18NComponent";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import { register } from "../actions/UserActions";
import { Link } from "react-router";
import { arrayToObject, objectToArray } from "../util/data-types";
import Form from "../components/Form";

export default class Register extends I18NComponent {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            repassword: "",
            loading: false,
            errors: {}
        }
    }
    render() {
        //generate the input fields
        const username = <Input 
            onChange={this.handleUsernameChange.bind(this)}
            placeholder={ this.getWord("Username") }
            error={this.state.errors.username}
            busy={this.state.loading}
        />;
        const password = <PasswordInput 
            onChange={this.handlePasswordChange.bind(this)}
            error={this.state.errors.password}
            busy={this.state.loading}
        />;
        const repassword = <PasswordInput 
            onChange={this.handleRepasswordChange.bind(this)}
            error={this.state.errors.repassword}
            busy={this.state.loading}
            placeholder={this.getWord("Retype Password")}
        />;
        const baseUrlInput = <BaseUrlInput />;

        let errorMessages = objectToArray(this.state.errors)

        let formFooter = <span>
            {this.getWord("Or") + " "}
            <Link to="login">{this.getWord("Login")}</Link>
        </span>
        //create the form
        const form = <Form
            onSubmit={this.handleSubmit.bind(this)}
            submitButtonText={this.getWord("Please register")}
            title={this.getWord("Register")}
            errors={errorMessages}
            footer={formFooter}
            loading={this.state.loading}
        >
            {username}
            {password}
            {repassword}
            {baseUrlInput}
        </Form>


        return <div className="main">
            {form}
        </div>;
    }

    handleSubmit(oEvent) {
        this.setState({ loading: true });
        oEvent.preventDefault();
        register(this.state.username, this.state.password)
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
        })
    }

    handleUsernameChange(username) {
        this.setState({ username });
    }

    handlePasswordChange(password) {
        this.setState({ password });
    }

    handleRepasswordChange(repassword) {
        this.setState({ repassword });
    }
}
