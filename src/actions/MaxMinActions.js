import dispatcher from "../dispatcher";
import constants from "../constants";

export function update() {
    console.log("update triggered");
    dispatcher.dispatch({
        type: constants.TOGGLE_STATE
    })
}
