import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";

export default class Chat extends Component {
    render() {
        return <div>
            <Sidebar />

            <section id="chatContent">
                <div className="page-header">
                    <h1>Chat
                        <small> The simple video conference</small>
                    </h1>
                </div>

                <Video />

            </section>


        </div>
    }
}
