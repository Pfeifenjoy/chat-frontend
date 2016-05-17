import dispatcher from "../dispatcher";
import constants from "../constants";

export function minifySidebar(to) {
    dispatcher.dispatch({
        type: constants.SIDEBAR_TOGGLE,
        payload: to
    });
}
