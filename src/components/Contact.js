import React from "react";
import Component from "./Component";
import AddContactForm from "./AddContactForm";
import SmallIcon from "./SmallIcon";
import BigIcon from "./BigIcon";
import { Link } from "react-router";

//stores
import RoomStore from "../stores/RoomStore";
import UserStore from "../stores/UserStore";

//Actions
import { changeActiveRoom, exitRoom } from "../actions/RoomActions";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: RoomStore.rooms,
            selectedRoom: RoomStore.selectedRoom
        };
        refreshContacts();
    }

    componentWillMount() {
        this.handleEvents(RoomStore, this.updateContacts.bind(this));
    }

    updateRooms() {
        this.setState({
            rooms: RoomStore.rooms,
            selectedRoom: RoomStore.selectedRoom
        });
    }

    render() {
        const rooms = this.state.rooms.map(room => {

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
                <BigIcon /><i>{UserStore.username}</i>
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

