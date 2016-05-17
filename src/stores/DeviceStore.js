import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class DeviceStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            electron: window && window.process && window.process.type,
        }
        window.onresize = this.updateScreenSize.bind(this);
    }
    get electron() {
        return this.data.electron;
    }

    get small() {
        return screen.width <= 450;
    }


    get large() {
        return !this.small;
    }

    updateScreenSize() {
        this.emit("change");
    }

    handleActions(action) {
        const { type, payload } = action;
        switch(type) {
        }
    }
}

const deviceStore = new DeviceStore;
dispatcher.register(deviceStore.handleActions.bind(deviceStore));

export default deviceStore;
