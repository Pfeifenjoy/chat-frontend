import React from "react";
import I18NComponent from "./I18NComponent";
import { logout } from "../actions/UserActions";
import { Link } from "react-router";

export default class Logout extends I18NComponent {
    render() {
        return <Link className="btn btn-warning logout-button" onClick={this.logout} to="/">
            <span className="fa fa-sign-out"></span>
            <span id="log_out">Logout</span>
        </Link>;
    }

    handleLogout() {
        logout(); //TODO handle fail
    }
}
