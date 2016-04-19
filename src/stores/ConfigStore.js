import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import {NEW_SERVER_ROOT} from "../constants";

class ConfigStore extends EventEmitter {
    constructor() {
        super();

        this.config = JSON.parse(window.localStorage.getItem("ConfigStore")) || {
            serverRoot: location.origin || "",
            wssLocation: (location.protocol === "http:" ? "ws://" : "wss://") + "localhost:3001", //TODO change
            apiLocation: "/api/v1/"
        }
        this.save();
    }

    get apiLocation() {
        return (this.config.serverRoot || "") + this.config.apiLocation;
    }
    get wssLocation() {
        return this.config.wssLocation;
    }

    save() {
        window.localStorage.setItem("ConfigStore", JSON.stringify(this.config));
    }
    getAll() {
        return this.config;
    }

    updateServerRoot(sNewRoot) {
        this.config.serverRoot = sNewRoot;
        this.save();
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case NEW_SERVER_ROOT: {
                this.updateServerRoot(action.text);
                break;
            }
        }
    }
}

const configStore = new ConfigStore;
dispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
