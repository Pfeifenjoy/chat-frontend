import I18NComponent from "./I18NComponent";
import DeviceStore from "../stores/DeviceStore";
import SidebarStore from "../stores/SidebarStore";

export default class Component extends I18NComponent {
    constructor() {
        super();
        this.handlers = [];
    }
    componentWillMount() {
        this.handleDeviceStore = () => {
            this.forceUpdate();
        }
        DeviceStore.on("change", this.handleDeviceStore);
        this.handleSidebarStore = () => {
            this.forceUpdate();
        }
        SidebarStore.on("change", this.handleSidebarStore);
    }

    componentWillUnmount() {
        //Clean up listeners
        try {
            DeviceStore.removeListener("change", this.handleDeviceStore);
            SidebarStore.removeListener("change", this.handleSidebarStore);
        } catch (e) {
            //This does not always work
        }

        this.handlers.forEach(handler => {
            handler.store.removeListener(handler.eventId, handler.callback);
        });

        this.handlers = [];
    }

    handleEvents(store, callback, eventId="change") {
        store.on(eventId, callback);
        this.handlers.push({store, callback, eventId});
    }
}
