import React, {Component} from "react";
import LoginForm from "../components/LoginForm";

export default class Login extends Component {

    render() {
        return <div id="login_wrapper">
            <section id="login" className="container">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <LoginForm />
                    </div>
                </div>
            </section>
        </div>
    }
}
