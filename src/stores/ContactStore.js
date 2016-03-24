import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import configStore from "./ConfigStore";
import url from "url";

class ContactStore extends EventEmitter {
    constructor(props) {
        super(props);
        
        this.store = {
            contacts: [
               
            ],

            selected: 0
        };


    }
    
    updateContacts() {
        $.ajax({
            url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation, "admin/contacts"),
            method: "GET",
            crossDomain: true
        }).done(oData => {
            this.store.contacts = oData.result;
            this.emit("change");
        });
        
        
    }

    getAll() {
        return this.store;
    }

    handleActions(action) {
        switch(action.type) {
            case constants.USER_SELECTED : {
                this.store.selected = action.id;
                this.emit("change");
                break;
            }
            case constants.REFRESH_CONTACTS : {
                this.updateContacts();
                break;
            }
        }
    }
}

const contactStore = new ContactStore();
dispatcher.register(contactStore.handleActions.bind(contactStore));

export default contactStore;