import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts} from "../actions/ContactActions";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactStore: ContactStore.getAll()
        };

        console.log("state initialized");


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
            </li>;
        });
        return <div>
            <ul id="contacts">
                {contacts}
            </ul>
        </div>
    }


    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.target.dataset.id);
    }
}


export default Contact;

