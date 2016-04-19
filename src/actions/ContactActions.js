import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserStore";

export function selectUser(username) {
    dispatcher.dispatch({
        type: constants.USER_SELECTED,
        username
    })
}

export function addUser(text) {
    dispatcher.dispatch({
        type: constants.ADD_USER,
        text
    })
}

export function deleteContact(contactId) {
    return $.ajax({
        url: ConfigStore.apiLocation + "users/" + UserStore.username + "/contacts/" + contactId,
        method: "DELETE"
    }).done(oData => {
        dispatcher.dispatch({
            type: constants.DELETED_CONTACT,
            contactId
        })
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
