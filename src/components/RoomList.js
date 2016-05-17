import React from "react";
import Component from "./Component";
import RoomStore from "../stores/RoomStore";
import AddContactForm from "./AddContactForm";

export default class UserInformation extends Component {
    constructor() {
        super();

        this.state = {
            rooms: RoomStore.rooms,
            selectedRoom: null
        }
    }

    componentWillMount() {
        this.handleRoomStore = () => {
            this.setState({ rooms: RoomStore.rooms });
        }
        this.handleEvents(RoomStore, this.handleRoomStore);
    }

    render() {
        const rooms = this.state.rooms.map(room => {
            let img = (contact.smallIcon != null ? contact.smallIcon : "src/img/default_icon.png");
            let className = "circular" + (contact.online ? " online" : " offline");
            let name = room.members.join(", ");
            return <li
                key={room.id}
                onClick={this.handleRoomSelect.bind(this)}
                data-id={name}
                className={room === this.state.selectedRoom ? "active" : ""}
            >
                <a>
                    <div className="onlineWrapper">
                        <img src={img} className={className}/>
                    </div>
                    {name}
                </a>
                <span
                    data-room={room}
                    className="delete fa fa-trash"
                    onClick={this.deleteRoom.bind(this)}
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
}
