import React, {Component} from "react";
import {addUser, updateLoadingAdnimation} from "../actions/ContactActions";
import ContactStore from "../stores/ContactStore";


export default class AddContactForm extends Component {
    constructor(props) {
        super(props);
        this.status = ContactStore.getStat();

    }

    componentWillMount() {
        ContactStore.on("update", this.updateLoading.bind(this));
        updateLoadingAdnimation()
    }

    updateLoading() {
        console.log("updateLoading: " + ContactStore.getStat());
        this.status = ContactStore.getStat();
        this.forceUpdate();
    }

    render() {
        let className = "fa fa-circle-o-notch fa-spin " + (this.status ? " " : "hidden");

        return <div id="addContactWrapper">
        <input type="text" name="addContact" id="newContact" placeholder="New Contact"
               onKeyDown={this.handleEnter.bind(this)}/>
        <i id="addLoader" className={className}></i>
        </div>
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
            ContactStore.setStat(true);
            updateLoadingAdnimation();

            addUser(event.target.value);
        }
    }
}