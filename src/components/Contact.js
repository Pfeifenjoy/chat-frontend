import React, {Component} from "react";
import ContactStore from "../stores/ContactStore";
import {selectUser, refreshContacts, deleteUser, updateLoadingAdnimation} from "../actions/ContactActions";
import AddContactForm from "./AddContactForm";
import UserStore from "../stores/UserInformationStore";
import {refreshIcons} from "../actions/UserActions";
import SmallIcon from "./SmallIcon";
import BigIcon from "./BigIcon";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactStore: ContactStore.getAll()
        };
        this._isMounted = false;
        refreshIcons();


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

            let img = (contact.small_icon != null ? contact.small_icon : "src/img/default_icon.png");

            let className = "circular" + (contact.online ? " online" : " offline");

            return <li key={i} onClick={this.handleContactSelect.bind(this)}
                       className={i == this.state.contactStore.selected ? "active" : ""}>
                <div className="onlineWrapper">
                    <img src={img} className={className}/>
                </div>

                    <a data-id={i} href="#">{contact.contactName}</a>
                <span data-contactname={contact.contactName} className="delete fa fa-trash"
                      onClick={this.deleteUser.bind(this)}></span>

            </li>;
        });


        return <div id="contactWrapper">
            <div id="iconWrapper">
                <BigIcon /><i id="username">{UserStore.getUsername()}</i>
                <SmallIcon />
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

