import React from "react";
import Component from "./Component";
import { Link } from "react-router";
import ConfigStore from "../stores/ConfigStore";
import DeviceStore from "../stores/DeviceStore";

//Subcomponents
import UserInformation from "./UserInformation";
import RoomList from "./RoomList";
import Menu from "./Menu";
import Logout from "./Logout";

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            minified: DeviceStore.small
        }
    }
    render() {
        const { minified } = this.state;
        let toggleClass = "fa " + (minified ? "fa-arrow-right" : "fa-arrow-left");
        return <section id="left_sidebar" className={minified ? "minified" : ""}>
            <i className={toggleClass} id="toggleSidebar" onClick={this.update.bind(this)}></i>

            <RoomList />

            <Menu />
            <Logout />
        </section>
    }

    update() {
        this.setState({ minified: !this.state.minified })
    }
}
