import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts} from "../actions/ContactActions";
import url from "url";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserInformationStore";


class Contact extends Component {

    constructor(props) {
        super(props);
        console.log(UserStore.getAll().username);
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
            <input type="text" name="addContact" id="newContact" placeholder="New Contact" onKeyDown={this.handleEnter.bind(this)}/>
        </div>
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
           $.ajax({
                url: url.resolve(ConfigStore.config.serverRoot + ConfigStore.config.apiLocation + UserStore.getAll().username+"/", "addContact"),
                method: "POST",
                data: { username: event.target.value },
                crossDomain: true
            }).done(oData => {
               if(oData.success) {
                   refreshContacts();
               }

            });
        }
    }

    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.target.dataset.id);
    }
}


export default Contact;

