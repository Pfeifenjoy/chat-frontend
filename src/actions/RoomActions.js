import dispatcher from "../dispatcher";
import constants from "../constants";
import connection from "../socket";
import UserStore from "../stores/UserStore";
import ConfigStore from "../stores/ConfigStore";
import $ from "jquery";

export function createRoom(contactNames) {
    let usernames = [UserStore.username, ...contactNames];
    return $.ajax({
        url: ConfigStore.apiLocation + "rooms",
        method: "POST",
        data: {usernames}
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.NEW_ROOM,
            room: response
        })
    })
}

export function exitRoom(roomId) {
    let usernames = [UserStore.username];
    return $.ajax({
        url: ConfigStore.apiLocation + "rooms/" + roomId + "/users",
        method: "DELETE",
        data: { usernames }
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.EXIT_ROOM.
            roomId
        });
    });
}

/**
 * refresh the rooms the user belongs to.
 */
export function refreshRooms() {
    let username = UserStore.username;
    return $.ajax({
        url: ConfigStore.apiLocation + "users/" + username + "/rooms",
        method: "GET"
    })
    .done(response => {
        dispatcher.dispatch({
            type: constants.FRESH_ROOMS,
            payload: response.rooms
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
 * A generic method to send messages.
 */
export function sendMessage(message) {
    try {
        connection.send(JSON.stringify(message));
        dispatcher.dispatch({
            type: constants.MESSAGE_SEND,
            message
        });
    } catch(e) {
        dispatcher.dispatch({
            type: constants.MESSAGE_FAILED,
            message
        })
    }
}

/**
 * Send a text message to a room.
 * Every member of the room will than get a notification.
 */
export function sendTextMessage(text, roomId) {
    let payload = {text, roomId};
    payload.createdAt = Date.now();

    let message = {
        type: constants.TEXT_MESSAGE,
        payload
    }

    sendMessage(message);
}

/**
 * Exposes the video connection to a specific room.
 * Than other clients can accept this connection.
 */
export function startVideo(candidate, roomId) {
    let payload = {candidate, roomId};

    let message = {
        type: constants.VIDEO_CALL_START,
        payload
    }

    sendMessage(message);
}

/**
 * Indicate that the video connection for a specific room 
 * is no longer exposed.
 */
export function stopVideo(roomId) {
    let payload = {roomId};

    let message = {
        type: constants.VIDEO_CALL_END,
        payload
    }

    sendMessage(message);
}
