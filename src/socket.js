import constants from "./constants";

//stores
import ConfigStore from "./stores/ConfigStore";
import UserStore from "./stores/UserStore";

class Socket {
    constructor() {
        this.connection = new WebSocket(ConfigStore.wssLocation);
        this.dispatchers = [];
        this.connection.onmessage = message => {
            this.dispatchers.forEach(dispatcher => {
                dispatcher.dispatch(message);
            })
        };
        this.connection.onerror = error => {
            this.dispatchers.forEach(dispatcher => {
                dispatcher.dispatch({
                    type: constants.MESSAGE_ERROR,
                    payload: error
                });
            });
        };
    }

    link(dispatcher) {
        //handle all events from server
        this.dispatchers.push(dispatcher);
        //delegate all events to server
        dispatcher.register(this.handleMessages.bind(this));
    }

    handleMessages(action) {
        let { type } = action;

        //only forward messages
        if( type === constants.MESSAGE_VIDEO_CALL_START
            || type === constants.MESSAGE_VIDEO_CALL_END
            || type === constants.MESSAGE_TEXT_MESSAGE
            || type === constants.MESSAGE_USER_CONNECTED ) {

            //authenticate
            action.token = UserStore.token;
            this.connection.send(action);
        }
    }
}

const socket = new Socket;
export default socket;
