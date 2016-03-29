import React, {Component} from "react";
import Contact from "./Contact";
import Room from "./Room";
import {Link} from "react-router";
import ConfigStore from "../stores/ConfigStore";
import url from "url";
import {closeSocket} from "../actions/SocketActions";


export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minified: false
        }
    }
    render() {
        let toggleClass = "fa " + (this.state.minified ? "fa-arrow-right" : "fa-arrow-left");
        return <section id="left_sidebar" className={(this.state.minified) ? "minified" : ""}>
            <i className={toggleClass} id="toggleSidebar" onClick={() => {this.state.minified = !this.state.minified; this.forceUpdate();}}></i>
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
