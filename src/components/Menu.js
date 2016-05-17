import React from "react";
import Component from "./Component";
import { Link } from "react-router";

export default class Menu extends Component {



    isActive(name) {
        var regEx = new RegExp("^.*#\/"+name+".*$");
        try {
            return (window.location.hash.match(regEx).length > 0);
        }
        catch(e) {
            return false;
        }
    }

    render() {
        return <nav>
            <ul>
                <li className={this.isActive("settings") ? "active" : ""}>
                    <Link to="/settings">
                        <i className="fa fa-cog"></i>
                        {this.props.small ? "" : "Settings"}
                    </Link>
                </li>
            </ul>
        </nav>
    }
}
