import React, {Component} from "react";
import UserStore from "../stores/UserInformationStore";
import smallIcon from "../img/default_big_icon.png";

export default class BigIcon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        UserStore.on("iconUpdate", this.forceUpdate.bind(this));
    }

    render() {
        let smallIcon = (UserStore.getAll().big_icon != null ? UserStore.getAll().small_icon : smallIcon;

        return <img src={smallIcon} className="profileBig" alt="" />
    }

}
