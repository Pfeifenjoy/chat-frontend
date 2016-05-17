import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserStore";
import $ from "jquery";


function getUserApi() {
    return encodeURIComponent(ConfigStore.apiLocation + "users/" + UserStore.username);
}

export function deleteContact(contact) {
    return $.ajax({
        url: getUserApi() + "/contacts/" + contactId,
        method: "DELETE"
    }).done(oData => {
        dispatcher.dispatch({
            type: constants.CONTACTS_DELETE_CONTACT,
            contact
        })
    })
}

export function addContact(contactId) {
    return $.ajax({
        url: getUserApi() + "/contacts",
        method: "POST",
        data: {
            contactId
        }
    }).done(contact => {
        dispatcher.dispatch({
            type: constants.CONTACT_NEW_CONTACT,
            contact
        })
    });
}

export function updateContacts() {
    return $.ajax({
        url: getUserApi() + "/contacts",
        method: "GET"
    }).done(data => {
        dispatcher.dispatch({
            type: constants.CONTACTS_REFRESH,
            payload: data.contacts
        })
    });
}
