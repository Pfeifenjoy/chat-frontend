import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class ConfigStore extends EventEmitter {
    constructor() {
        super();

        this.data = Object.assign({
            serverRoot: location.origin || "",
            wssLocation: (location.protocol === "http:" ? "ws://" : "wss://") + "localhost:4001", //TODO change
            apiLocation: "/api/v1/"
        }, JSON.parse(window.localStorage.getItem("ConfigStore")))
        this.save();
    }

    get apiLocation() {
        return (this.data.serverRoot || "") + this.data.apiLocation;
    }
    get wssLocation() {
        return this.data.wssLocation;
    }
    get baseUrlInput() {
        return this.data.serverRoot;
    }

    save() {
        window.localStorage.setItem("ConfigStore", JSON.stringify(this.data));
    }
    getAll() {
        return this.data;
    }

    updateServerRoot(payload) {
        this.data.serverRoot = payload.serverRoot || location.origin;
        this.save();
        this.emit("change");
    }

    handleActions(action) {
        const { type, payload } = action;
        switch(type) {
            case constants.CONFIG_NEW_SERVER_ROOT: {
                this.updateServerRoot(payload);
                break;
            }
        }
    }
}

const configStore = new ConfigStore;
dispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
