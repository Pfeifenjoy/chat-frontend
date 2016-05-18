import React from "react";
import Component from "../components/Component";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import DeviceStore from "../stores/DeviceStore";
import RoomStore from "../stores/RoomStore";

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            showOwnVideo: false,
            room: RoomStore.activeRoom
        }
    }
    componentWillMount() {
        //update if the active room changes
        this.handleEvents(RoomStore, room => {
            this.setState({
                room: RoomStore.activeRoom
            })
        }, "activeRoomChange");

        //Get all messages for this room.
        this.handleEvents(RoomStore, message => {
            if(message.roomId === this.state.room.id) {
                this.setState({ room: RoomStore.activeRoom });
            }
        }, "newMessage");
    }
    render() {
        if(!this.state.room) return <div />;
        let videoButtonClass = "fa";

        videoButtonClass += this.state.showOwnVideo ? " fa-stop" : " fa-video-camera";
        return <div id="container-fluid">
            <div className="topBar">
                <span
                    className="btn btn-primary"
                    title="Start video"
                    onClick={this.showOwnVideo.bind(this)}
                >
                    <i className={videoButtonClass}></i>
                </span>
            </div>
            <TxtChat />
        </div>
    }

    showOwnVideo() {
        this.setState({
            showOwnVideo: !this.state.showOwnVideo
        });
    }
}
