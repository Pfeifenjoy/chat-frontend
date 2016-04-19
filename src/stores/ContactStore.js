import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import configStore from "./ConfigStore";
import UserStore from "./UserStore";
import url from "url";


class ContactStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.store = {
            contacts: [],
            status: false,
            selected: -1,
            refreshing: false
        };
    }

    updateContacts() {
        $.ajax({
            url: configStore.config.apiLocation + "users/" + UserStore.config.username.trim() + "/contacts",
            method: "GET",
            crossDomain: true
        }).done(oData => {
            this.store.contacts = oData.contacts;
            this.emit("change");
        });
    }

    getAll() {
        return this.store;
    }

    get contacts() {
        return this.store.contacts;
    }
    get selectedContact() {
        return this.store.selected;
    }
    get refreshing() {
        return this.store.refreshing;
    }

    deleteContact(contactId) {
        let i = this.store.contacts.findIndex(contact => {
            return contact.username === contactId;
        })
        this.store.contacts.splice(i, 1);
        this.emit("change");
    }

    getStat() {
        return this.store.status;
    }

    setStat(status) {
        console.log("set status");
        this.store.status = status;
    }

    addUser(user) {
        $.ajax({
            url: configStore.config.apiLocation + "users/" + UserStore.config.username + "/contacts",
            method: "POST",
            data: {username: user},
            crossDomain: true
        }).done(oData => {
            console.log(oData);
            if (oData.success) {
                this.updateContacts();
            }

            this.setStat(false);
            this.emit("update");

        });
    }

    handleActions(action) {
        switch (action.type) {
            case constants.USER_SELECTED :
            {
                this.store.selected = action.username;
                this.emit("change");
                break;
            }
            case constants.REFRESH_CONTACTS :
            {
                this.updateContacts();
                break;
            }
            case constants.ADD_USER :
            {
                this.addUser(action.text);
                break;
            }
            case constants.DELETED_CONTACT :
            {
                this.deleteContact(action.contactId);
                break;
            }
            case constants.UPDATE_LOADING_ANIMATION : {
                this.emit("update");
                break;
            }
        }
    }
}

const contactStore = new ContactStore();
dispatcher.register(contactStore.handleActions.bind(contactStore));

export default contactStore;
