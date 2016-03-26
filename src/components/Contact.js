import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts, deleteUser, updateLoadingAdnimation} from "../actions/ContactActions";
import AddContactForm from "./AddContactForm";
import UserStore from "../stores/UserInformationStore";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactStore: ContactStore.getAll()
        };
        this._isMounted = false;

    }

    componentWillMount() {
        ContactStore.on("change", this.updateContacts.bind(this));
    }

    componentDidMount() {
        this._isMounted = true;
        refreshContacts();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    updateContacts() {
        if (this._isMounted)
            this.setState({contactStore: ContactStore.getAll()});
    }

    render() {
        const contacts = this.state.contactStore.contacts.map((contact, i) => {

            let className = "fa" + (contact.online ? " fa-circle" : " fa-circle-thin");

            return <li key={i} onClick={this.handleContactSelect.bind(this)}
                       className={i == this.state.contactStore.selected ? "active" : ""}>
                <a className={className} data-id={i} href="#">{contact.contactName}</a>
                <span data-contactname={contact.contactName} className="delete fa fa-trash"
                      onClick={this.deleteUser.bind(this)}></span>
            </li>;
        });
        return <div id="contactWrapper">
            <div id="iconWrapper">
                <img id="bigIcon" src="src/img/big_icon.jpg"/><i id="username">{UserStore.getUsername()}</i>
                <img id="smallIcon" className="circular" src="src/img/small_icon.jpg"/>
            </div>

            <ul id="contacts">
                {contacts}
            </ul>

            <AddContactForm />
        </div>
    }


    deleteUser(event) {
        event.preventDefault();
        ContactStore.setStat(true);
        updateLoadingAdnimation();
        deleteUser(event.target.dataset.contactname);
    }

    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.target.dataset.id);
    }
}


export default Contact;

