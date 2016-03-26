import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.config = JSON.parse(window.localStorage.getItem("UserStore")) || {
                username: ""
            }

        //this.save();
    }

    save() {
        window.localStorage.setItem("UserStore", JSON.stringify(this.config));
    }

    getAll() {
        return this.config;
    }

    getUsername() {
        return this.config.username;
    }

    updateUsername(username) {
        this.config.username = username;
        this.save();
        this.emit("change");
    }

    handleActions(action) {
        switch (action.type) {
            case constants.NEW_USER_NAME:
            {
                this.updateUsername(action.text);
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
