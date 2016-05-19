import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "./ConfigStore";
import { refreshRooms } from "../actions/RoomActions";
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
            rooms: {},
            activeRoom: undefined
        };
        refreshRooms();
    }

    get rooms() {
        return objectToArray(this.data.rooms);
    }

    get activeRoom() {
        return this.data.activeRoom;
    }

    getRoom(id) {
        return this.data.rooms[id];
    }

    addMessage(message) {
        //Get the room
        let room = this.data.rooms[message.room];
        if(!room) {
            console.warn("unknow room for message", message);
            return;
        }
        room.messages = room.messages || [];
        room.messages.push(message)
        this.emit("newMessage", message, room);
    }

    addRoom(room) {
        this.data.rooms[room.id] = room;
        this.emit("change");
    }

    changeActiveRoom(room) {
        this.data.activeRoom = this.data.rooms[room.id];
        this.emit("activeRoomChange");
    }


    removeRoom(room) {
        delete this.data.rooms[room.id];
        this.emit("change")
    }

    setRooms(rooms) {
        this.data.rooms = arrayToObject(rooms);
        this.emit("change")
    }

    handleActions(action) {
        const { type, payload } = action;
        switch(type) {
            case constants.MESSAGE_TEXT_MESSAGE: {}
            case constants.MESSAGE_VIDEO_CALL_START: {}
            case constants.MESSAGE_VIDEO_CALL_END: {
                this.addMessage(payload)
                break;
            }
            case constants.ROOMS_NEW_ROOM: {
                this.addRoom(payload);
                break;
            }
            case constants.ROOMS_EXIT_ROOM: {
                this.removeRoom(payload);
                break;
            }
            case constants.ROOMS_NEW_ROOMS: {
                this.setRooms(payload);
                break;
            }
            case constants.ROOMS_NEW_ACTIVE_ROOM: {
                this.changeActiveRoom(payload);
                break;
            }
        }
    }
}

let roomStore = new RoomStore;
dispatcher.register(roomStore.handleActions.bind(roomStore));

export default roomStore;
