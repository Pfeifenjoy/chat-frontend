import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import configStore from "./ConfigStore";
import UserStore from "./UserInformationStore";
import url from "url";


class ContactStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.store = {
            contacts: [],
            status: false,
            selected: 0
        };




    }

    updateContacts() {
        $.ajax({
            url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation + UserStore.config.username.trim() + "/", "contacts"),
            method: "GET",
            crossDomain: true
        }).done(oData => {
            console.log(oData.result);
            this.store.contacts = oData.result;
            this.emit("change");
        });
    }

    getAll() {
        return this.store;
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
            url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation + UserStore.config.username + "/", "addContact"),
            method: "POST",
            data: {username: user},
            crossDomain: true
        }).done(oData => {
            if (oData.success) {
                this.updateContacts();
            }

            this.setStat(false);
            this.emit("update");

        });
    }

    deleteUser(user) {
        console.log("Delete user: " + user);
        $.ajax({
            url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation + UserStore.config.username + "/", "deleteContact"),
            method: "POST",
            data: {username: user},
            crossDomain: true
        }).done(oData => {
            console.log(oData);
            if (oData.success) {
                this.updateContacts();
                this.setStat(false);
                this.emit("update");
            }
        });

    }

    handleActions(action) {
        switch (action.type) {
            case constants.USER_SELECTED :
            {
                this.store.selected = action.id;
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
            case constants.DELETE_USER :
            {
                this.deleteUser(action.text);
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