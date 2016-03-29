import dispatcher from "../dispatcher";
import constants from "../constants";

//@deprecated
export function newNotify(status, text) {
    console.log("new notify");
    dispatcher.dispatch({
        type: constants.NEW_NOTIFY,
        boolean: status,
        text
    })
}

export function deleteNotify(id) {
    dispatcher.dispatch({
        type: constants.DELETE_NOTIFY,
        id
    });
}

export function createNotification(message) {
    dispatcher.dispatch({
        type: constants.CREATE_NOTIFY,
        message
    });
}
