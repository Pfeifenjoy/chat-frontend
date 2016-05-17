import React from "react";
import Component from "../components/Component";
import Sidebar from "../components/Sidebar";
import DeviceStore from "../stores/DeviceStore";

export default class Layout extends Component {
    render() {
        return <div className="container-fluid">
            <Sidebar />
            <section id="mainContent" className={DeviceStore.small ? "maximized" : ""}>
                {this.props.children}
            </section>
       </div>;
    }
}
