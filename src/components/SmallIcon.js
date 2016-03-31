import React, {Component} from "react";
import UserStore from "../stores/UserInformationStore";
import ConfigStore from "../stores/ConfigStore";

export default class SmallIcon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        UserStore.on("iconUpdate", this.forceUpdate.bind(this));
    }

    render() {
        return <img className="profileSmall circular" alt="" src={UserStore.getAll().small_icon}/>
    }

}