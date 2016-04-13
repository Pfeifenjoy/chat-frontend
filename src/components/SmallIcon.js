import React, {Component} from "react";
import UserStore from "../stores/UserStore";
import ConfigStore from "../stores/ConfigStore";
import zlib from "zlib";
import realSrc from "../img/default_icon.png";

export default class SmallIcon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        UserStore.on("iconUpdate", this.forceUpdate.bind(this));
    }

    handleClick(index) {
        console.log("clicked");
    }

    render() {
        let realSrc = UserStore.getAll().small_icon != null ? UserStore.getAll().small_icon : realSrc;
        return <img className="profileSmall circular" alt="" src={realSrc}/>
    }

}
