import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import MaxMinStore from "../stores/MaxMinStore";

export default class Chat extends Component {
    componentWillMount() {
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    render() {
        return <div id="fluidContainer">
            <Sidebar />

            <section id="mainContent" className={(MaxMinStore.getState().minified) ? "maximized" : ""}>
                <TxtChat />

            </section>


        </div>
    }
}
