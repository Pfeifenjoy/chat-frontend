import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import SocketStore from "../stores/SocketStore";

export default class Chat extends Component {
    componentWillMount() {
        SocketStore.setConnection('ws://localhost:3000');
    }

    render() {
        return <div id="fluidContainer">
            <Sidebar />

            <section id="chatContent">
                <TxtChat />

            </section>


        </div>
    }
}
