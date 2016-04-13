import dispatcher from "../dispatcher";
import constants from "../constants";

export function newUsername(text) {
    dispatcher.dispatch({
        type: constants.NEW_USER_NAME,
        text
    });
}

export function login(username, password) {
    dispatcher.dispatch({
        type: constants.LOGIN,
        username, 
        password
    });
}

export function refreshIcons() {
    dispatcher.dispatch({
        type: constants.REFRESH_ICONS
    });
}

