import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import url from "url";
import ConfigStore from "./ConfigStore";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            user: JSON.parse(localStorage.getItem("user")) || {
                username: "",
                token: null,
                id: "",
                smallIcon: null,
                bigIcon: null
            }
        }
    }
    get authenticated() {
        return !!this.data.user.token;
    }
    get username() {
        return this.data.user.username;
    }
    get token() {
        return this.data.user.token;
    }
    get smallIcon() {
        return this.data.user.smallIcon;
    }
    get bigIcon() {
        return this.data.user.bigIcon;
    }

    updateIcons(icons) {
        Object.assign(this.data.user, icons);
        this.emit("change");
    }

    login(user) {
        this.data.user = user
        localStorage.setItem("user", JSON.stringify(user));
        this.emit("change");
    }

    logout() {
        delete this.data.user;
        localStorage.removeItem("user");
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
