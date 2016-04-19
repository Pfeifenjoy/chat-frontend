import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";
import {refreshContacts} from "../actions/ContactActions";
import {videoMessage} from "../actions/SocketActions";
import ConfigStore from "./ConfigStore";

class SocketStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.state = {
                connection: null,
                videoMsg: null
        };
    }

    setConnection() {
        let url = "ws://localhost:3001" //TODO
        this.state.connection = new WebSocket(url);
        this.state.connection.onmessage = this.gotMessageFromServer.bind(this);
    }
    
    gotMessageFromServer(message) {
        var signal = JSON.parse(message.data);
        console.log(signal);

        if (signal.update != undefined) {
            refreshContacts();
        }
        else {
            videoMessage(signal);
            this.emit("videoMsg");
        }
    }

    closeConnection() {
        //this.state.connection.close();
    }

    getConnection() {
        return this.state.connection;
    }

    send(text) {
        this.state.connection.send(text);
    }

    getVideoMsg() {
        return this.state.videoMsg;
    }

    handleActions(action) {
        switch(action.type) {
            case constants.CLOSE_SOCKET: {
                this.closeConnection();
                this.emit("update");
                break;
            }
            case constants.VIDEO_MESSAGE: {
                this.state.videoMsg = action.text;
                break;
            }
            case constants.AUTHENTICATED: {
                setConnection();
                break;
            }
        }
    }
}

const socketStore = new SocketStore;
dispatcher.register(socketStore.handleActions.bind(socketStore));

export default socketStore;
