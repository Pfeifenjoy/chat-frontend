import React from "react";
import I18NComponent from "./I18NComponent";
import { logout } from "../actions/UserActions";
import { Link } from "react-router";

export default class Logout extends I18NComponent {
    render() {
        return <Link
            className="btn btn-warning logout-button"
            onClick={this.handleLogout}
            to="/">
            <span className="fa fa-sign-out"></span>
            <span>Logout</span>
        </Link>;
    }

    handleLogout() {
        logout()
    }
}
