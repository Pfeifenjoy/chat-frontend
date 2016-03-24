import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class ContactStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.store = {
            contacts: [
                {
                    online: true,
                    name: "Arwed"
                },

                {
                    online: false,
                    name: "Steffen"
                }
            ],

            selected: 0
        };

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
        }
    }
}

const contactStore = new ContactStore();
dispatcher.register(contactStore.handleActions.bind(contactStore));

export default contactStore;