import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import ContactStore from "./ContactStore";
import ConfigStore from "./ConfigStore";
import {refreshRooms} from "../actions/RoomActions";

/**
 * This store manages the connections / rooms of the user.
 *
 * Every room has an id.
 * Therefore here is a map this.state.rooms where you can reference a store.
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
        this.state = {
            rooms: {},
            activeRoom: null
        };
        refreshRooms();
    }

    get rooms() {
        let rooms = [];
        for(let id in this.state.rooms) {
            rooms.push(this.state.rooms[id]);
        }
        return rooms;
    }

    get activeRoom() {
        return this.state.activeRoom;
    }
    
    getRoom(id) {
        return this.state.rooms[id];
    }

    addMessage(roomId, message) {
        let room = this.state.rooms[roomId];
        room.messages.push(message)
        this.emit("message", message);
        if(room !== this.state.activeRoom)
            this.emit("messageInactiveRoom", message)
        else 
            this.emit("messageActiveRoom", message)
    }

    addRoom(room) {
        this.state.rooms.push(room)
        this.emit("roomsChanged");
    }

    selectRoom(id) {
        this.state.activeRoom = this.state.rooms[id];
        this.emit("newActiveRoom");
    }

    removeRoom(id) {
        if(this.state.rooms[id] === this.state.activeRoom) {
            this.state.activeRoom = null;
            this.emit("newActiveRoom");
        }
        delete this.state.rooms[id];
        this.emit("roomsChanged")
    }

    refreshRooms(rooms) {
        this.state.rooms = {};

        rooms.forEach(room => {
            this.state.rooms[room.id] = room;
        })
        this.emit("roomsChanged")
    }

    handleActions(action) {
        switch(action.type) {
            case constants.TEXT_MESSAGE: {
                this.addMessage(action.roomId, action.message)
                break;
            }
            case constants.NEW_ROOM: {
                this.addRoom(action.room);
                break;
            }
            case constants.EXIT_ROOM: {
                this.removeRoom(action.roomId);
            }
            case constants.SELECT_ROOM: {
                this.selectRoom(action.id);
                break;
            }
            case constants.UNSELECT_ROOM: {
                this.state.activeRoom = null;
                this.emit("newActiveRoom");
                break;
            }
            case constants.FRESH_ROOMS: {
                this.refreshRooms(action.rooms);
                break;
            }
            case constants.USER_SELECTED: {
                console.log(action);
            }
        }
    }
}

let roomStore = new RoomStore;
dispatcher.register(roomStore.handleActions.bind(roomStore));

export default roomStore;
