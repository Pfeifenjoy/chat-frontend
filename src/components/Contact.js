import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts, deleteUser} from "../actions/ContactActions";
import AddContactForm from "./AddContactForm";


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
        if(this._isMounted)
            this.setState({contactStore: ContactStore.getAll()});
    }

    render() {
        const contacts = this.state.contactStore.contacts.map((contact, i) => {

            let className = "fa" + (contact.online ? " fa-circle" : " fa-circle-thin");

            return <li key={i} onClick={this.handleContactSelect.bind(this)}  className={i == this.state.contactStore.selected ? "active" : ""}>
                <a className={className} data-id={i} href="#">{contact.contactName}</a>
                <span data-contactName = {contact.contactName} className="delete fa fa-trash" onClick={this.deleteUser.bind(this)}></span>
            </li>;
        });
        return <div>
            <ul id="contacts">
                {contacts}
            </ul>

            <AddContactForm />
           </div>
    }
    

    deleteUser(event) {
        event.preventDefault();
        deleteUser(event.target.dataset.contactName);
    }

    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.target.dataset.id);
    }
}


export default Contact;

