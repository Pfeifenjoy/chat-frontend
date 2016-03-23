import React, {Component} from "react";

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
                                <div className="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me" />
                                        <p>Remember me</p>
                                    </label>
                                </div>
                                <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
                            </fieldset>
                        </form>
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

        //TODO
        this.setState({username: "", password: "", submitFailed: false});
    }

}
