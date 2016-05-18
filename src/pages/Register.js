import React from "react";
import BaseUrlInput from "../components/BaseUrlInput";
import I18NComponent from "../components/I18NComponent";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import { register } from "../actions/UserActions";
import { Link } from "react-router";
import { arrayToObject, objectToArray } from "../util/data-types";

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
        const repassword = <PasswordInput 
            onChange={this.handleRepasswordChange.bind(this)}
            error={this.state.errors.repassword}
            busy={this.state.loading}
            placeholder={this.getWord("Retype Password")}
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
                {repassword}
                {baseUrlInput}
                <input 
                    className="btn btn-lg btn-success btn-block"
                    type="submit"
                    value={this.state.loading ? this.getWord("Loading...") : this.getWord("Register")}
                    disabled={this.state.loading}
                />
            </fieldset>
        </form>;

        //create the panel
        const head = <div className="panel-heading">
            <h3 className="panel-title">{this.getWord("Please register")}</h3>
        </div>;
        const body = <div className="panel-body">
            {form}
            <span>
                {this.getWord("Or") + " "}
                <Link to="login">{this.getWord("Login")}</Link>
            </span>
        </div>;

        return <div className="panel panel-default">
            {head}
            {body}
        </div>;
    }

    handleSubmit(oEvent) {
        this.setState({ loading: true });
        oEvent.preventDefault();
        register(this.state.username, this.state.password)
        .fail(errors => {
            this.setState({
                loading: false,
                errors: arrayToObject(JSON.parse(errors.responseText).errors, "field")
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
