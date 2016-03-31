import React, {Component} from "react";
import Contact from "./Contact";
import Room from "./Room";
import {Link} from "react-router";
import ConfigStore from "../stores/ConfigStore";
import url from "url";
import {closeSocket} from "../actions/SocketActions";
import MaxMinStore from "../stores/MaxMinStore";
import {update} from "../actions/MaxMinActions";


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
            <Room />
        </section>
    }

    logout() {
        closeSocket();
        $.ajax({
            url: url.resolve(ConfigStore.config.serverRoot + ConfigStore.config.apiLocation, "logout"),
            method: "GET",
            crossDomain: true
        }).done(oData => {

        });
    }
}
