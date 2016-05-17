import dispatcher from "../dispatcher";
import { CONFIG_NEW_SERVER_ROOT } from "../constants";

export function changeServerRoot(payload) {
    dispatcher.dispatch({
        type: CONFIG_NEW_SERVER_ROOT,
        payload,
    });
}


