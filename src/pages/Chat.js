import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import SocketStore from "../stores/SocketStore";
import MaxMinStore from "../stores/MaxMinStore";

export default class Chat extends Component {
    componentWillMount() {
        SocketStore.setConnection('ws://localhost:3434');
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    render() {
        return <div id="fluidContainer">
            <Sidebar />

            <section id="chatContent" className={(MaxMinStore.getState().minified) ? "maximized" : ""}>
                <TxtChat />

            </section>


        </div>
    }
}
