import React, {Component} from "react";
import MaxMinStore from "../stores/MaxMinStore";




export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    isActive(name) {
        var regEx = new RegExp("^.*#\/"+name+".*$");
        try {
            return (window.location.hash.match(regEx).length > 0);
        }
        catch(e) {
            return false;
        }
    }

    render() {
        console.log(window.location.hash)

        return <nav>
            <ul>
                <li className={this.isActive("settings") ? 'active' : ''}><a href="#/settings"><i className="fa fa-cog"></i> {MaxMinStore.getState().minified ? '' : 'Settings'}</a></li>
            </ul>
        </nav>
    }
}