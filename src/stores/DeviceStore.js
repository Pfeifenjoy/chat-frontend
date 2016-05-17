import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DeviceStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            electron: window && window.process && window.process.type
        }
        window.onresize = this.updateScreenSize.bind(this);
    }
    get electron() {
        return this.data.electron;
    }

    get small() {
        return this.data.small <= 450;
    }

    get large() {
        return !this.small;
    }

    updateScreenSize() {
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            
        }
    }
}

const deviceStore = new DeviceStore;
dispatcher.register(deviceStore.handleActions.bind(deviceStore));

export default deviceStore;
