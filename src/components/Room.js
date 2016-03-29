import React, {Component} from "react";
import AddRoomForm from "./AddRoomForm";

/**
 * This component creates an input to create a new room.
 */

export default class Room extends Component {
    render() {
        return <div id="roomWrapper">
            <h1>Rooms</h1>
            <AddRoomForm />
        </div>
    }
}
