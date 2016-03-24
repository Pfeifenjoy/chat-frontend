import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts, addUser, deleteUser} from "../actions/ContactActions";
import url from "url";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserInformationStore";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactStore: ContactStore.getAll()
        };


    }

    componentWillMount() {
        ContactStore.on("change", this.updateContacts.bind(this));
        refreshContacts();
    }

   

    updateContacts() {
        this.setState({contactStore: ContactStore.getAll()});
    }

    render() {
        const contacts = this.state.contactStore.contacts.map((contact, i) => {

            let className = "fa" + (contact.online ? " fa-circle" : " fa-circle-thin");

            return <li key={i} onClick={this.handleContactSelect.bind(this)}  className={i == this.state.contactStore.selected ? "active" : ""}>
                <a className={className} data-id={i} href="#">{contact.username}</a>
                <span data-username = {contact.username} className="delete fa fa-trash" onClick={this.deleteUser.bind(this)}></span>
            </li>;
        });
        return <div>
            <ul id="contacts">
                {contacts}
            </ul>
            <input type="text" name="addContact" id="newContact" placeholder="New Contact" onKeyDown={this.handleEnter.bind(this)}/>
        </div>
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
            addUser(event.target.value);
        }
    }

    deleteUser(event) {
        event.preventDefault();
        deleteUser(event.target.dataset.username);
        //event.target.dataset.username
    }

    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.target.dataset.id);
    }
}


export default Contact;

