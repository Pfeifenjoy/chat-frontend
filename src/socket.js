import constants from "./constants";

//stores
import ConfigStore from "./stores/ConfigStore";
import UserStore from "./stores/UserStore";

class Socket {
    constructor() {
        this.connection = new WebSocket(ConfigStore.wssLocation);
        this.connection.onopen = () => {
            this.connection.send(JSON.stringify({
                type: constants.MESSAGE_AUTHENTICATE,
                payload: {
                    token: UserStore.token
                }
            }));
        }
        this.dispatchers = [];
        //prevent loops
        this.messages = new Set;
        this.connection.onmessage = message => {
            message = JSON.parse(message.data);
            this.messages.add(message);
            this.dispatchers.forEach(dispatcher => {
                dispatcher.dispatch(message);
            })
        };
        this.connection.onerror = error => {
            message = JSON.parse(error.data);
            this.messages.add(error);
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
        //prevent loops
        if(this.messages.has(action)) {
            this.messages.delete(action);
            return;
        }
        let { type } = action;

        //only forward messages
        if( type === constants.MESSAGE_VIDEO_CALL_START
            || type === constants.MESSAGE_VIDEO_CALL_END
            || type === constants.MESSAGE_TEXT_MESSAGE
            || type === constants.MESSAGE_USER_CONNECTED
            || type === constants.MESSAGE_WELCOME
            || type === constants.MESSAGE_UNAUTHENTICATED
          ) {
              console.log(action);

            //authenticate
            action.token = UserStore.token;
            this.connection.send(JSON.stringify(action));
        }
    }
}

const socket = new Socket;
export default socket;
