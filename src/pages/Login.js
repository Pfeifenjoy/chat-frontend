import React, {Component} from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        return <form action={this.props.action} className="login-form" onSubmit={this.handleSubmit.bind(this)} method="post">
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        name="username" 
                        type="text" 
                        className="form-control"
                        value={this.state.username}
                        onChange={this.handleUsernameChange.bind(this)}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password"
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handlePasswordChange.bind(this)}
                        />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
            </form>;
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
        if(!username || !password) {
            return;
        }
        
        //TODO
        this.setState({username: "", password: ""});
    }

}
