import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

import {newNotify} from "../actions/NotifyActions";

class NotifyStore extends EventEmitter {
    constructor() {
        super();

        this.notify = {
            active: false,
            message: ""
        }
    }

    getNotify() {
        return this.notify;
    }

    handleActions(action) {
        switch(action.type) {
            case constants.NEW_NOTIFY: {
                this.startNotify(action.boolean, action.text);
                console.log("startNotify");
                if(action.boolean) {
                    setTimeout(() => {
                        console.log("inactive");
                        newNotify(false, this.notify.message);
                    }, 2000);

                }

                this.emit("notify");

                break;
            }

        }
    }

    startNotify(status, msg) {
        this.notify = {active: status, message: msg};
    }



}

const notifyStore = new NotifyStore;
dispatcher.register(notifyStore.handleActions.bind(notifyStore));

export default notifyStore;
