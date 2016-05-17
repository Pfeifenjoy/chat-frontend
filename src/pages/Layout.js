import React from "react";
import Component from "../components/Component";
import Sidebar from "../components/Sidebar";
import DeviceStore from "../stores/DeviceStore";
import SidebarStore from "../stores/SidebarStore";

export default class Layout extends Component {
    render() {
        let bodyPageClassname = "page";
        bodyPageClassname += SidebarStore.small ? " maximized" : " minimized";
        return <div id="wrapper" className="container-fluid">
            <Sidebar />
            <section className={bodyPageClassname}>
                {this.props.children}
            </section>
       </div>;
    }
}
