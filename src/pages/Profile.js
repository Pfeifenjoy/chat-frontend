import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import SocketStore from "../stores/SocketStore";
import MaxMinStore from "../stores/MaxMinStore";
import UserStore from "../stores/UserInformationStore";

export default class Chat extends Component {
    componentWillMount() {
        SocketStore.setConnection('ws://localhost:3434');
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    render() {
        return <div id="fluidContainer">
            <Sidebar />

            <section id="mainContent" className={(MaxMinStore.getState().minified) ? "maximized" : ""}>
                <div id="profileBig" style={{background: 'url("src/img/big_icon.jpg") no-repeat; background-size: cover'}}>
                    <img src="src/img/small_icon.jpg" className="profileSmall circular" alt="" />
                    <p>{UserStore.getUsername()}</p>
                </div>

                <p>Username: {UserStore.getUsername()}</p>


            </section>


        </div>
    }
}
