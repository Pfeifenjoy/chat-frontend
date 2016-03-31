import React, {Component} from "react";
import UserStore from "../stores/UserInformationStore";
import ConfigStore from "../stores/ConfigStore";
import zlib from "zlib";

export default class SmallIcon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        UserStore.on("iconUpdate", this.forceUpdate.bind(this));
    }

    render() {
        let realSrc = (UserStore.getAll().small_icon != null ? UserStore.getAll().small_icon : 'src/img/default_icon.png');
        return <img className="profileSmall circular" alt="" src={realSrc}/>
    }

}