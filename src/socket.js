import ConfigStore from "./stores/ConfigStore";
const connection = new WebSocket(ConfigStore.wssLocation);
export default connection;
