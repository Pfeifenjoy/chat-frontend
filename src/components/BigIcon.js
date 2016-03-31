import React, {Component} from "react";
import UserStore from "../stores/UserInformationStore";

export default class BigIcon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        UserStore.on("iconUpdate", this.forceUpdate.bind(this));
    }

    render() {
        let smallIcon = "src/img/" + (UserStore.getAll().big_icon != null ? UserStore.getAll().small_icon  : 'default_big_icon.png');

        return <img src={smallIcon} className="profileBig" alt="" />
    }

}