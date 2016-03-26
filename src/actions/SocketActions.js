import dispatcher from "../dispatcher";
import constants from "../constants";

export function closeSocket() {
    dispatcher.dispatch({
        type: constants.CLOSE_SOCKET
    })
}

export function videoMessage(text) {
    dispatcher.dispatch({
        type: constants.VIDEO_MESSAGE,
        text
    })
}