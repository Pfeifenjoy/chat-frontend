import React from "react";
import Component from "../components/Component";

//components
import Sidebar from "../components/Sidebar";
import TxtChat from "../components/TxtChat";

//stores
import RoomStore from "../stores/RoomStore";

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            room: RoomStore.activeRoom,
        }
    }
    componentWillMount() {
        //update if the active room changes
        this.handleEvents(RoomStore, room => {
            this.setState({
                room: RoomStore.activeRoom
            })
        }, "activeRoomChange");
    }
    render() {
        if(!this.state.room) return <div />;
        return <div className="container-fluid chat">
            <TxtChat />
        </div>
    }

}
