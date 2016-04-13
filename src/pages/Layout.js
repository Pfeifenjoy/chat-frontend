import React, {Component} from "react";
import NotificationBar from "../components/NotificationBar";

export default class Layout extends Component {
    render() {
        return <div className="wrapper">
            <NotificationBar />
            {this.props.children}
       </div>;
    }
}
