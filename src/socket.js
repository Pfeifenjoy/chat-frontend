import constants from "./constants";

//stores
import ConfigStore from "./stores/ConfigStore";
import UserStore from "./stores/UserStore";
import dispatcher from "./dispatcher.js";

//actions
import { logout } from "./actions/UserActions";

/**
 * A websocket wrapper.
 * @see https://codereview.stackexchange.com/questions/104315/flux-async-communication-with-websockets
 */
class SocketWrapper {
    constructor(location) {
        this.location = location;
        UserStore.on("change", () => {
            if(UserStore.authenticated) {
                this.initialize();
            }
        })
        this.initialize();
    }

    initialize() {
        this.deferredCounter = 0;
        this.connected = false;
        this.messages = {};
        this.ws = new WebSocket(this.location);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    onOpen() {
        this.connected = true;
        this.send({
            type: constants.MESSAGE_AUTHENTICATE,
            payload: {
                token: UserStore.token
            }
        });
    }

    onClose() {
        this.connected = true;
    }

    onMessage(message) {
        //get message
        message = JSON.parse(message.data);
        console.log('←', message);

        //get acknowledge messages
        if(message.type === constants.MESSAGE_ACKNOWLEDGE) {
            if(!message.transactionid) {
                console.warn("server did not return transactionid.");
                return;
            }
            this.messages[message.transactionid].resolve();
            delete this.messages[message.transactionid];
            return;
        }

        //catch authentication
        if(message.type === constants.MESSAGE_AUTHENTICATE) {
            return;
        }

        //handle errors
        if(message.type === constants.MESSAGE_ERROR) {
            if(!message.transactionid) {
                console.warn("server did not return transactionid.");
                return;
            }
            this.messages[message.transactionid].reject();
            delete this.messages[message.transactionid];
            return;
        }
        if(message.type === constants.MESSAGE_UNAUTHENTICATED) {
            logout();
            return;
        }


        dispatcher.dispatch(message);
    }

    onError() {
        //Nothing can be done
    }


    send(message) {
        return new Promise((resolve, reject) => {
            //handle disconnected
            if(!this.connected) return reject({
                type: constants.MESSAGE_DISCONNECTED,
            });
            //Save message in message store
            message.transactionid = this.deferredCounter++;
            this.messages[message.transactionid] = {
                resolve: resolve.bind(this, message),
                reject: reject.bind(this, message)
            }
            //send the message
            this.ws.send(JSON.stringify(message));
            console.log('→', message);

        });
    }
}


const socket = new SocketWrapper(ConfigStore.wssLocation);
export default socket;
