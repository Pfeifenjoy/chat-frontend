import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";

export default class Chat extends Component {
    render() {
        return <div id="fluidContainer">
            <Sidebar />

            <section id="chatContent">
                <TxtChat />

            </section>


        </div>
    }
}
