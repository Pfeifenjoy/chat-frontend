import React from "react";
import Component from "./Component";
import { Link } from "react-router";
import { minifySidebar } from "../actions/SidebarActions";

//Stores
import ConfigStore from "../stores/ConfigStore";
import DeviceStore from "../stores/DeviceStore";
import SidebarStore from "../stores/SidebarStore";
//Subcomponents
import RoomList from "./RoomList";
import Menu from "./Menu";
import Logout from "./Logout";


export default class Sidebar extends Component {
    render() {
        const minified = SidebarStore.small;
        let toggleClass = "toggleSidebar fa";
        toggleClass += minified ? " fa-arrow-right" : " fa-arrow-left";
        let className = "sidebar";
        if(minified) className += " minified";
        return <section className={className}>
            <i className={toggleClass} onClick={this.update.bind(this)}></i>
            <div className="scrollable">
                <RoomList small={SidebarStore.small} />
                <Menu small={SidebarStore.small} />
            </div>
            <Logout
                small={SidebarStore.small} 
            />
        </section>
    }

    update() {
        minifySidebar(!SidebarStore.small);
    }
}
