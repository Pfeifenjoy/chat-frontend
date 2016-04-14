import React, {Component} from "react";
import Contact from "./Contact";
import Room from "./Room";
import {Link} from "react-router";
import ConfigStore from "../stores/ConfigStore";
import url from "url";
import {closeSocket} from "../actions/SocketActions";
import MaxMinStore from "../stores/MaxMinStore";
import {update} from "../actions/MaxMinActions";
import Menu from "./Menu";
import {browserHistory} from "react-router";


export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    render() {
        let toggleClass = "fa " + (MaxMinStore.getState().minified ? "fa-arrow-right" : "fa-arrow-left");
        return <section id="left_sidebar" className={(MaxMinStore.getState().minified) ? "minified" : ""}>
            <i className={toggleClass} id="toggleSidebar" onClick={update.bind(this)}></i>
            <Link id="logout" className="btn btn-warning" onClick={this.logout} to="/">
                <span className="fa fa-sign-out"></span>
                <span id="log_out">Logout</span>
            </Link>

            <Contact />

            <Menu />
        </section>
    }

    logout() {
        closeSocket();
        $.ajax({
            url: ConfigStore.apiLocation + "logout",
            method: "GET",
            crossDomain: true
        }).done(oData => {
            browserHistory.push("/");
        });
    }
}
