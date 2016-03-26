import React, {Component} from "react";
import AddRoomForm from "./AddRoomForm";


export default class Room extends Component {
    render() {
        return <div id="roomWrapper">
            <h1>Rooms</h1>
            <AddRoomForm />
        </div>
    }
}