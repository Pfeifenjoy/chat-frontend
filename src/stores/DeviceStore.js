import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DeviceStore extends EventEmitter {
    constructor() {
        super();
        this.device = {
            electron: window && window.process && window.process.type
        }
    }
    getAll() {
        return this.device;
    }

    handleActions(action) {
        switch(action.type) {
            
        }
    }
}

const deviceStore = new DeviceStore;
dispatcher.register(deviceStore.handleActions.bind(deviceStore));

export default deviceStore;
