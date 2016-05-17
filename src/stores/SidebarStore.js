import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import DeviceStore from "./DeviceStore";

class SidebarStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            small: DeviceStore.small
        }
    }
    get small() {
        return this.data.small;
    }

    get large() {
        return !this.small;
    }

    updateScreenSize() {
        this.data.smallMenu = this.small;
        this.emit("change");
    }

    handleActions(action) {
        const { type, payload } = action;
        switch(type) {
            case constants.SIDEBAR_TOGGLE: {
                this.data.small = payload;
                this.emit("change");
                break;
            }
        }
    }
}

const sidebarStore = new SidebarStore;
dispatcher.register(sidebarStore.handleActions.bind(sidebarStore));

export default sidebarStore;
