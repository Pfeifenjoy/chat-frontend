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
            contacts: [
               
            ],

            selected: 0
        };


    }
    
    updateContacts() {
        console.log("Username: " + UserStore.config.username);
        $.ajax({
            url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation + UserStore.config.username.trim()+"/", "contacts"),
            method: "GET",
            crossDomain: true
        }).done(oData => {
            console.log(url);
            console.log("oData: " + oData);
            console.log(oData.result);
            this.store.contacts = oData.result;
            console.log(this.store.contacts);
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