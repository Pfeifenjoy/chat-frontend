import {EventEmitter} from "events";
import constants from "../constants";
import dispatcher from "../dispatcher";



class MaxMinStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.state = {
            minified: false
        };
    }

    getState() {
        return this.state;
    }

    toggleState() {
        console.log("toggle");
        this.state.minified = !this.state.minified;
    }

    handleActions(action) {
        switch(action.type) {
            case constants.TOGGLE_STATE: {
                this.toggleState();
                this.emit("update");
            }
        }
    }
}


const maxMinStore = new MaxMinStore;
dispatcher.register(maxMinStore.handleActions.bind(maxMinStore));

export default maxMinStore;