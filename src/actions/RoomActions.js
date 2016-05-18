import dispatcher from "../dispatcher";
import constants from "../constants";
import UserStore from "../stores/UserStore";
import ConfigStore from "../stores/ConfigStore";
import { ajax } from "../util/ajax";
import socket from "../socket";

export function createRoom(members) {
    return ajax({
        url: ConfigStore.apiLocation + "rooms",
        method: "POST",
        data: { members }
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.ROOMS_NEW_ROOM,
            payload: response
        })
    })
}

export function exitRoom(room) {
    let usernames = [UserStore.username];
    return ajax({
        url: ConfigStore.apiLocation + "rooms/" + room.id + "/users",
        method: "DELETE",
        data: { usernames }
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.EXIT_ROOM.
            room
        });
    });
}

/**
 * refresh the rooms the user belongs to.
 */
export function refreshRooms() {
    let username = UserStore.username;
    return ajax({
        url: ConfigStore.apiLocation + "/rooms",
        method: "GET"
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.ROOMS_NEW_ROOMS,
            payload: response
        })
    })
}

/**
 * Change the room which is active.
 * This is relevant for the chat and the sidebar.
 */
export function changeActiveRoom(room) {
    dispatcher.dispatch({
        type: constants.ROOMS_NEW_ACTIVE_ROOM,
        payload: room
    })
}



/**
 * Send a text message to a room.
 * Every member of the room will than get a notification.
 */
export function sendTextMessage(text, room) {
    let payload = {
        text,
        user: UserStore.user
    };

    let message = {
        type: constants.TEXT_MESSAGE,
        roomId: room.id,
        payload
    }

    return socket.send(message);
}

/**
 * Exposes the video connection to a specific room.
 * Than other clients can accept this connection.
 */
export function startVideo(candidate, room) {
    let payload = {candidate};

    let message = {
        type: constants.VIDEO_CALL_START,
        roomId: room.id,
        payload
    }

    return socket.send(message);
}

/**
 * Indicate that the video connection for a specific room 
 * is no longer exposed.
 */
export function stopVideo(room) {
    let payload = {};

    let message = {
        type: constants.VIDEO_CALL_END,
        roomId: room.id,
        payload
    }

    return socket.send(message);
}
