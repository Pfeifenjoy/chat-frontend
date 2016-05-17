import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import DeviceStore from "../stores/DeviceStore";

export default class Chat extends Component {



    render() {
        return <div id="container-fluid">
                <TxtChat />
        </div>
    }
}
