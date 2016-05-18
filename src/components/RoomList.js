import React from "react";
import Component from "./Component";

//Components
import AddContactForm from "./AddContactForm";
import SmallIcon from "./SmallIcon";
import BigIcon from "./BigIcon";

//stores
import RoomStore from "../stores/RoomStore";
import UserStore from "../stores/UserStore";
import SidebarStore from "../stores/SidebarStore";

//Actions
import { 
    changeActiveRoom,
    exitRoom,
    refreshRooms
} from "../actions/RoomActions";

//Static resources
const standardImage = require("../img/default_icon.png");

export default class UserInformation extends Component {
    constructor() {
        super();
        this.state = {
            rooms: RoomStore.rooms,
            selectedRoom: RoomStore.selectedRoom
        }
    }

    componentWillMount() {
        this.handleRoomStore = () => {
            this.setState({ 
                rooms: RoomStore.rooms,
                selectedRoom: RoomStore.activeRoom
            });
        }
        this.handleEvents(RoomStore, this.handleRoomStore);

        this.handleRoomStoreActiveRoom = () => {
            this.setState({
                selectedRoom: RoomStore.activeRoom
            })
        }
        this.handleEvents(RoomStore, this.handleRoomStoreActiveRoom, "activeRoomChange");
        refreshRooms();
    }

    render() {
        const rooms = this.state.rooms.map(room => {
            let members = room.members
            .filter(member => member.id !== UserStore.user.id);

            let name = !SidebarStore.small ? members
            .map(member => member.username)
            .join(", ") : "";

            let img = members[0].icon || standardImage;
            return <li
                key={room.id}
                onClick={this.getSelectRoomHandler(room)}
                className={room === this.state.selectedRoom ? "active" : ""}
            >
                <a className="item">
                    <img src={img} />
                    {name}
                    <span
                        className="delete fa fa-trash"
                        onClick={this.getDeleteRoomHandler(room)}
                    ></span>
                </a>
                <div className="clear"></div>
            </li>;
        });

        let className = "roomList";
        if(SidebarStore.small) className += " small";
        return <div className={className}>
            <ul>
                {rooms}
            </ul>
            <AddContactForm visible={this.props.small} />
        </div>
    }

    getDeleteRoomHandler(room) {
        return () => {
            exitRoom(room);
        }
    }

    getSelectRoomHandler(room) {
        return () => {
            changeActiveRoom(room);
        }
    }
}
