import React, {Component} from "react";

export default class Sidebar extends Component {
    render() {
        return <section id="left_sidebar">
            <h1>Contacts</h1>
            <a id="logout" className="btn btn-warning" href="index.html">
                <span className="glyphicon glyphicon-log-out"></span> Logout
            </a>
        </section>
    }
}
