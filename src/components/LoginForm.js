import React, {Component} from "react";
import $ from "jquery";
import {hashHistory, Link} from "react-router";
import url from "url";
import {newUsername} from "../actions/UserActions";
import UserStore from "../stores/UserInformationStore";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
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
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Password"
               value={this.state.password}
               onChange={this.handlePasswordChange.bind(this)} name="password"
               type="password"
               />
           </div>;
       return <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Please sign in</h3>
                    </div>
                    <div className="panel-body">
                        <form acceptCharset="UTF-8" role="form" action="index.html#/app" method="post"
                              onSubmit={this.handleSubmit.bind(this)}>
                            <fieldset>
                                {username}
                                {password}
                                {this.props.children}

                                <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
                            </fieldset>
                        </form>
                        <span>Or <Link to="register">register</Link></span>
                    </div>

                </div>;
    }

    handleUsernameChange(oEvent) {
        this.setState({
            username: oEvent.target.value
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
        if (!username || !password) {
            this.setState({submitFailed: true});
            return;
        }

        $.ajax({
            url: url.resolve(this.props.target, "authenticate"),
            method: "POST",
            data: { username, password },
            crossDomain: true
        }).done(oData => {
            console.log(oData);
            if(oData.success) {
                newUsername(username);
                

                hashHistory.push("/app");
            }

            //
        });
        this.setState({username: "", password: "", submitFailed: false});
    }

}
