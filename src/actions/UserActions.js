import dispatcher from "../dispatcher";
import constants from "../constants";


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

