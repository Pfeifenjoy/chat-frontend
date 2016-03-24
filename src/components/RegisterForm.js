import React, {Component} from "react";
import $ from "jquery";
import {hashHistory, IndexLink} from "react-router";
import url from "url";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repassword:"",
            submitFailed: false
        };
    }

    render() {
        const usernameState = "form-group" + (this.state.submitFailed && this.state.username.trim() === "" ? " has-error" : "");
        const username = <div className={usernameState}>
            <input className="form-control" placeholder="Username"
                   value={this.state.username}
                   onChange={this.handleUsernameChange.bind(this)} name="username"
                   type="text"/>
        </div>;
        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
        const repasswordState = "form-group" + (this.state.submitFailed && this.state.repassword.length < 10 ? " Has-error" : "" );
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Password"
                   value={this.state.password}
                   onChange={this.handlePasswordChange.bind(this)} name="password"
                   type="password"
            />
        </div>;
        const rePassword =  <div className={repasswordState}>
            <input className="form-control" placeholder="Repassword"
                   value={this.state.repassword}
                   onChange={this.handleRePasswordChange.bind(this)} name="repassword"
                   type="password"
            />
        </div>;
        return <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Please register</h3>
            </div>
            <div className="panel-body">
                <form acceptCharset="UTF-8" role="form" action="index.html#/app" method="post"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        {username}
                        {password}
                        {rePassword}
                        {this.props.children}

                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Register"/>
                    </fieldset>
                </form>
                <span>Or <IndexLink to="/">login</IndexLink></span>
            </div>
        </div>;
    }

    handleUsernameChange(oEvent) {
        this.setState({
            username: oEvent.target.value
        });
    }

    handleRePasswordChange(oEvent) {
        this.setState({
            repassword: oEvent.target.value
        });
    }

    handlePasswordChange(oEvent) {
        this.setState({
            password: oEvent.target.value
        });
    }

    handleSubmit(oEvent) {
        oEvent.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password;
        let repassword = this.state.repassword;
        if (!username || !password || password != repassword) {
            this.setState({submitFailed: true});
            return;
        }

        $.ajax({
            url: url.resolve(this.props.target, "register"),
            method: "POST",
            data: { username, password },
            crossDomain: true
        }).done(oData => {
            hashHistory.push("/");
        });
        this.setState({username: "", password: "", repassword: "", submitFailed: false});
    }

}
