import React from "react";
import Component from "./Component";
import ConfigStore from "../stores/ConfigStore";
import DeviceStore from "../stores/DeviceStore";
import { changeServerRoot } from "../actions/LoginActions";

export default class BaseUrlInput extends Component {
    render() {
        //Only display in electron app
        if(DeviceStore.electron) {
            return <div className="input-group" id="url">
                <span className="input-group-addon">host</span>
                <input className="form-control" placeholder="http://www.chat.de"
                   value={ConfigStore.serverRoot}
                   onChange={this.handleBaseUrlChange.bind(this)} 
                   type="text"/>

               </div>
                ;
        }
        return <div></div>;
    }

    handleBaseUrlChange(oEvent) {
        changeServerRoot(oEvent.target.value);
    }
}

