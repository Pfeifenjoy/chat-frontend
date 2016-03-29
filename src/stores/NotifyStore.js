import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

import {newNotify} from "../actions/NotifyActions";

class NotifyStore extends EventEmitter {
    constructor() {
        super();

        this._notifications = [];

        //@deprecated
        this.notify = {
            active: false,
            message: ""
        }
    }

    get notifications() {
        return this._notifications;
    }

    addNotification(notification) {
        notification.id = this._notifications.length;
        this._notifications.push(notification);
        this.emit("notificationChange");
    }

    removeNotification(id) {
        this._notifications = this._notifications.splice(id, id);
        this.emit("notificationChange");
    }

    getNotify() {
        return this.notify;
    }

    handleActions(action) {
        switch(action.type) {
            //@deprecated
            case constants.NEW_NOTIFY: {
                this.addNotification(action.message);
                console.log("notifystore new notify");
                this.setNotify(action.boolean, action.text);

                if(action.boolean) {
                    setTimeout(() => {
                        newNotify(false, this.notify.message);
                    }, 2000);
                }
                this.emit("notify");
                break;
            }
            case constants.DELETE_NOTIFY: {
                this.removeNotification(action.id);
                break;
            }
            case constants.CREATE_NOTIFY: {
                this.addNotification(action.message);
                break;
            }
        }


    }

    setNotify(status, msg) {
        console.log("set notify");
        this.notify = {active: status, message: msg};
    }

}

const notifyStore = new NotifyStore;
dispatcher.register(notifyStore.handleActions.bind(notifyStore));

export default notifyStore;
