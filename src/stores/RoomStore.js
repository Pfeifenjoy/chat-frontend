import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "./ConfigStore";
import {refreshRooms} from "../actions/RoomActions";
import { objectToArray, arrayToObject } from "../util/data-types.js";

/**
 * This store manages the connections / rooms of the user.
 *
 * Every room has an id.
 * Therefore here is a map this.data.rooms where you can reference a store.
 * A store is an object which has an array of users and an array of messages.
 * A user is always represented by his username.
 * A message is an object with a
 *  - date
 *  - type (Text, Video, Audio)
 *  - content (e.g text)
 *
 *  The active room is the room which is currently selected.
 *  This room is special because if you receive a message this
 *  will be shown in this room.
 */
class RoomStore extends EventEmitter {
    constructor(id) {
        super();
        this._id = id;
        this.data = {
            rooms: {}
        };
        refreshRooms();
    }

    get rooms() {
        return objectToArray(this.data.rooms);
    }

    getRoom(id) {
        return this.data.rooms[id];
    }

    addMessage(payload) {
        //Get the room
        room = this.data.rooms[payload.roomId];
        room.messages.push(payload.message)
        this.emit("newMessage", message, room);
    }

    addRoom(room) {
        this.data.rooms[room.id] = room;
        this.emit("roomsChanged");
    }


    removeRoom(id) {
        delete this.data.rooms[id];
        this.emit("roomsChanged")
    }

    setRooms(rooms) {
        this.data.rooms = arrayToObject(rooms);
        this.emit("roomsChanged")
    }

    handleActions(action) {
        const { type, payload } = action;
        switch(type) {
            case constants.ROOMS_NEW_MESSAGE: {
                this.addMessage(payload)
                break;
            }
            case constants.ROOMS_NEW_ROOM: {
                this.addRoom(payload);
                break;
            }
            case constants.ROOMS_DELETE_ROOM: {
                this.removeRoom(payload);
            }
            case constants.ROOMS_NEW_ROOMS: {
                this.setRooms(payload);
                break;
            }
        }
    }
}

let roomStore = new RoomStore;
dispatcher.register(roomStore.handleActions.bind(roomStore));

export default roomStore;
