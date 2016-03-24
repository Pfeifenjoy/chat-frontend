import dispatcher from "../dispatcher";
import constants from "../constants";

export function newNotify(status, text) {
    dispatcher.dispatch({
        type: constants.NEW_NOTIFY,
        boolean: status,
        text
    })
}
