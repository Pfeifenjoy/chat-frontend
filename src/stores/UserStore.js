import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import url from "url";
import ConfigStore from "./ConfigStore";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.config = {
            username: sessionStorage.getItem("username") || "",
            small_icon: null,
            big_icon: null,
            authenticated: sessionStorage.getItem("username") ? true : false,
            authenticationFailed: false
        }
    }
    get authenticated() {
        return this.config.authenticated;
    }
    get username() {
        return this.config.username;
    }

    getAll() {
        return this.config;
    }


    getIcons() {
        $.ajax({
            url: ConfigStore.apiLocation + "userInformation",
            method: "GET",
            crossDomain: true
        }).done(oData => {
            console.log("getIcons");
            this.config.small_icon = oData.small_icon;
            this.config.big_icon = oData.big_icon;
            this.emit("iconUpdate");
        }).fail(() => {
            console.log("fail");
        })
    }

    login(username, password) {
        $.ajax({
            url: ConfigStore.apiLocation + "login",
            method: "POST",
            data: { username, password },
            crossDomain: true
        }).done(oData => {
            this.config.authenticated = true;
            this.config.username = username;
            sessionStorage.setItem("username", username);
            this.config.authenticationFailed = false;
        }).fail(() => {
            this.config.authenticated = false;
            this.config.authenticationFailed = true;
        }).always(() => {
            this.emit("change");
        });
    }

    handleActions(action) {
        switch (action.type) {
            case constants.REFRESH_ICONS:
            {
                this.getIcons();

                break;
            }

            case constants.LOGIN:
            {
                this.login(action.username, action.password);
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
