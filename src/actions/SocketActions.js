import dispatcher from "../dispatcher";
import constants from "../constants";
import ConfigStore from "../stores/ConfigStore";
import connection from "../socket";

//Forward all actions from the server to the dispatcher
//This are mainly messages
connection.onmessage = function(message) {
    let data = JSON.parse(message.data);
    dispatcher.dispatch(data)
}

connection.onclose = function() {
    dispatcher.dispatch({
        type: constants.CLOSE_SOCKET
    })
}
