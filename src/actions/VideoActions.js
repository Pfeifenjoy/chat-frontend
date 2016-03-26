import dispatcher from "../dispatcher";
import constants from "../constants";

export function stopVideo() {
    dispatcher.dispatch({
        type: constants.STOP_VIDEO
    })
}

