import React, {Component} from "react";
import Contact from "./Contact";
import {Link} from "react-router";
import ConfigStore from "../stores/ConfigStore";
import url from "url";
import {closeSocket} from "../actions/SocketActions";
import Videos from "./Video";

export default class Sidebar extends Component {
    render() {
        return <section id="left_sidebar">
            <h1>Contacts</h1>
            <Link id="logout" className="btn btn-warning" onClick={this.logout} to="/">
                <span className="fa fa-sign-out"></span> Logout
            </Link>

            <Contact />
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
