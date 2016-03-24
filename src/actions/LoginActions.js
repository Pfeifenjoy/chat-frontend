import dispatcher from "../dispatcher";
import {NEW_SERVER_ROOT} from "../constants";

export function changeServerRoot(text) {
    dispatcher.dispatch({
        type: NEW_SERVER_ROOT,
        text,
    });
}


