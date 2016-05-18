import React from "react";
import Component from "./Component";

//Components
import AddContactForm from "./AddContactForm";
import SmallIcon from "./SmallIcon";
import BigIcon from "./BigIcon";

//stores
import RoomStore from "../stores/RoomStore";
import UserStore from "../stores/UserStore";

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
                selectedRoom: RoomStore.selectedRoom
            });
        }
        this.handleEvents(RoomStore, this.handleRoomStore);
        refreshRooms();
    }

    render() {
        const rooms = this.state.rooms.map(room => {
            let img = room.smallIcon ? room.smallIcon : standardImage;
            let className = "circular" + (room.online ? " online" : " offline");
            let name = room.members.join(", ");
            return <li
                key={room.id}
                onClick={this.getSelectRoomHandler(room)}
                className={room === this.state.selectedRoom ? "active" : ""}
            >
                <a>
                    <div className="onlineWrapper">
                        <img src={img} className={className}/>
                    </div>
                    {name}
                </a>
                <span
                    className="delete fa fa-trash"
                    onClick={this.getDeleteRoomHandler(room)}
                ></span>
                <div className="clear"></div>
            </li>;
        });


        return <div>
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
