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
        return <div id="login_wrapper">
            <section id="login" className="container">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign in</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form" action="index.html#/app" method="post"
                                      onSubmit={this.handleSubmit.bind(this)}>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Username"
                                                   value={this.state.username}
                                                   onChange={this.handleUsernameChange.bind(this)} name="username"
                                                   type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password"
                                                   value={this.state.password}
                                                   onChange={this.handlePasswordChange.bind(this)} name="password"
                                                   type="password"
                                                   value=""/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me"> Remember
                                                    Me </input>
                                            </label>
                                        </div>
                                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
                                    </fieldset>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
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
        //oEvent.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password;
        if (!username || !password) {
            return;
        }

        //TODO
        this.setState({username: "", password: ""});
    }

}
