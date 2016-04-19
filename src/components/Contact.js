import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts, deleteContact, updateLoadingAdnimation} from "../actions/ContactActions";
import AddContactForm from "./AddContactForm";
import UserStore from "../stores/UserStore";
import {refreshIcons} from "../actions/UserActions";
import SmallIcon from "./SmallIcon";
import BigIcon from "./BigIcon";
import {Link} from "react-router";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: ContactStore.contacts,
            selectedContact: ContactStore.selectedContact,
        };
        refreshIcons();
        refreshContacts();
    }

    componentWillMount() {
        ContactStore.on("change", this.updateContacts.bind(this));
    }


    updateContacts() {
        this.setState({
            contacts: ContactStore.contacts,
            selectedContact: ContactStore.selectedContact
        });
    }

    render() {
        const contacts = this.state.contacts.map((contact, i) => {

            let img = (contact.smallIcon != null ? contact.smallIcon : "src/img/default_icon.png");

            let className = "circular" + (contact.online ? " online" : " offline");

            return <li key={i} onClick={this.handleContactSelect.bind(this)} data-id={contact.username}
                       className={contact.username === this.state.selectedContact ? "active" : ""}>

                <a  href="#">
                    <div className="onlineWrapper">
                        <img src={img} className={className}/>
                    </div>
                    {contact.username}
                </a>
                <span data-contactname={contact.username} className="delete fa fa-trash"
                      onClick={this.deleteUser.bind(this)}></span>
                <div className="clear"></div>

            </li>;
        });


        return <div id="contactWrapper">
            <div id="iconWrapper">
                <BigIcon /><i id="username">{UserStore.username}</i>
                <Link to="/profile">
                    <SmallIcon />
                </Link>
            </div>

            <ul id="contacts">
                {contacts}
            </ul>

            <AddContactForm />
        </div>
    }


    deleteUser(event) {
        event.preventDefault();
        deleteContact(event.target.dataset.contactname);
    }

    handleContactSelect(event) {
        event.preventDefault();
        selectUser(event.currentTarget.dataset.id);
    }
}


export default Contact;

