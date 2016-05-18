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
                id: "",
                icon: ""
            },
            token: localStorage.getItem("token") || null
        }
    }
    get authenticated() {
        return !!this.data.token;
    }
    get username() {
        return this.data.user.username;
    }
    get token() {
        return this.data.token;
    }
    get icon() {
        return this.data.user.icon;
    }
    get id() {
        return this.data.user.id
    }
    get email() {
        return this.data.user.email;
    }
    get user() {
        return this.data.user;
    }

    updateIcons(icons) {
        Object.assign(this.data.user, icons);
        this.emit("change");
    }

    updateUser(user) {
        Object.assign(this.data.user, user);
        this.save();
        this.emit("change");
    }

    save() {
        localStorage.setItem("user", JSON.stringify(this.data.user));
        localStorage.setItem("token", this.data.token);
    }

    login(payload) {
        this.data.user = payload.user
        this.data.token = payload.token
        this.save();
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
            case constants.USER_UPDATE: {
                this.updateUser(payload);
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
