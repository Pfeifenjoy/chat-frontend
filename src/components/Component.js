import I18NComponent from "./I18NComponent";
import DeviceStore from "../stores/DeviceStore";

export default class Component extends I18NComponent {
    constructor() {
        super();
        this.state = {
            small: DeviceStore.small
        }
    }
    componentWillMount() {
        this.handleDeviceStore = () => {
            this.setState({
                small: DeviceStore.small
            });
        }
        DeviceStore.on("change", this.handleDeviceStore);
    }

    componentWillUnmount() {
        //Clean up listeners
        DeviceStore.removeListener("change", this.handleDeviceStore);
    }
}
