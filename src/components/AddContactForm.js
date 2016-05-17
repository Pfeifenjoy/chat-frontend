import React from "react";
import Component from "./Component";
import { searchUser } from "../actions/UserActions";
import { createRoom } from "../actions/RoomActions";


export default class AddContactForm extends Component {
    constructor() {
        super();
        this.state = {
            showIndicator: false,
            searchResults: [],
            searchFailed: false
        }
    }

    render() {
        if(!!this.props.visible) return <div />;

        const searchResults = this.state.searchResults.splice(0, this.props.maxSearchResults || 5)
        .map(user => {
            return <ul>
                <li
                    data-id={user.id}
                    onClick={this.handleNewRoom.bind(this)}
                >user.username</li>
            </ul>;
        });

        let indicatorClass = this.state.searchFailed ?
            "fa fa-exclamation" : "fa fa-circle-o-notch fa-spin";

        indicatorClass += " indicator " + (this.state.showIndicator ? " " : "hidden");
        return <div className="addWrapper">
            <input
                type="text"
                name="userSearch"
                className="userSearch"
                placeholder={ this.getWord("Search User") }
                onKeyDown={ this.handleEnter.bind(this) }
            />
        <i className={indicatorClass}></i>
        </div>
    }

    handleEnter(event) {
        this.setState({
            showIndicator: true
        })
        searchUser(event.target.value.trim())
        .done(users => {
            this.setState({
                searchResults: users,
                searchFailed: false,
                showIndicator: false
            })
        })
        .fail(() => {
            this.setState({
                searchFailed: true
            });
        })
    }

    handleNewRoom(oEvent) {
        let contactId = oEvent.target.attributes.getNamedItem("data-id");
        createRoom([ UserStore.userId, contactId ])
    }
}
