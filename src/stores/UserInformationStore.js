import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import url from "url";
import ConfigStore from "./ConfigStore";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.config = JSON.parse(window.localStorage.getItem("UserStore")) || {
                username: "",
                small_icon: null,
                big_icon: null
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
    
    getIcons() {
        $.ajax({
            url: url.resolve(ConfigStore.getAll().serverRoot + ConfigStore.getAll().apiLocation, "userInformation"),
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

    handleActions(action) {
        switch (action.type) {
            case constants.NEW_USER_NAME:
            {
                this.updateUsername(action.text);
                break;
            }

            case constants.REFRESH_ICONS:
            {
                this.getIcons();

                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
