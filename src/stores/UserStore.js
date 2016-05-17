import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import url from "url";
import ConfigStore from "./ConfigStore";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            username: sessionStorage.getItem("username") || "",
            authenticated: sessionStorage.getItem("username") ? true : false,
            smallIcon: null,
            bigIcon: null
        }
    }
    get authenticated() {
        return this.data.authenticated;
    }
    get username() {
        return this.data.username;
    }
    get smallIcon() {
        return this.data.smallIcon;
    }
    get bigIcon() {
        return this.data.bigIcon;
    }

    updateIcons(icons) {
        Object.assign(this.data, icons);
        this.emit("change");
    }

    login(user) {
        this.data.username = user.username;
        sessionStorage.setItem("username", user.username);
        this.data.authenticated = true;
        this.emit("change");
    }

    logout() {
        delete this.data.username;
        sessionStorage.removeItem("username");
        this.data.authenticated = false;
        this.emit("change");
    }

    handleActions(action) {
        const { type, payload } = action;
        switch (type) {
            case constants.USER_NEW_ICONS: {
                this.updateIcons(payload);
                break;
            }
            case constants.USER_LOGIN: {
                this.login(payload);
                break;
            }
            case constants.USER_LOGOUT: {
                this.logout();
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
