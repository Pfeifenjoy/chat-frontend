import React, {Component} from "react";
import {addUser, updateLoadingAdnimation} from "../actions/ContactActions";
import ContactStore from "../stores/ContactStore";


export default class AddContactForm extends Component {
    constructor(props) {
        super(props);
        this.status = ContactStore.getStat();
        this._isMounted = false;

    }

    componentWillMount() {
        ContactStore.on("update", this.updateLoading.bind(this));
        updateLoadingAdnimation()
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    updateLoading() {
        console.log("updateLoading: " + ContactStore.getStat());
        if(this._isMounted) {
            this.status = ContactStore.getStat();
            this.forceUpdate();
        }
    }

    render() {
        let className = "fa fa-circle-o-notch fa-spin " + (this.status ? " " : "hidden");

        return <div className="addWrapper">
        <input type="text" name="addContact" className="newElement" placeholder="New Contact"
               onKeyDown={this.handleEnter.bind(this)}/>
        <i  className={"addLoader " + className}></i>
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