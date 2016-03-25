import dispatcher from "../dispatcher";
import constants from "../constants";

export function selectUser(id) {
    dispatcher.dispatch({
        type: constants.USER_SELECTED,
        id
    })
}

export function addUser(text) {
    dispatcher.dispatch({
        type: constants.ADD_USER,
        text
    })
}

export function deleteUser(text) {
    dispatcher.dispatch({
        type: constants.DELETE_USER,
        text
    })
}

export function refreshContacts() {
    dispatcher.dispatch({
        type: constants.REFRESH_CONTACTS
    })
}

export function updateLoadingAdnimation() {
    dispatcher.dispatch({
        type: constants.UPDATE_LOADING_ANIMATION
    })

}