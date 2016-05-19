import React from "react";
import Component from "./Component";
import { searchUser } from "../actions/UserActions";
import { createRoom } from "../actions/RoomActions";
import UserStore from "../stores/UserStore";


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
            return <li
                className="searchResult"
                onClick={this.getAddContactHandler(user)}
                key={ user.id }
            >{user.username}</li>
        });

        let indicatorClass = this.state.searchFailed ?
            "fa fa-exclamation" : "fa fa-circle-o-notch fa-spin";

        indicatorClass += " indicator " + (this.state.showIndicator ? " " : "hidden");
        return <div className="addWrapper">
            <input
                ref="searchField"
                type="text"
                name="userSearch"
                className="userSearch"
                placeholder={ this.getWord("Search User") }
                onChange={ this.handleEnter.bind(this) }
            />
        <i className={indicatorClass}></i>
        {searchResults}
        </div>
    }

    handleEnter(event) {
        this.setState({
            searchResults: [],
            searchFailed: false
        })
        let query = event.target.value.trim();
        if(query !== "") {
            this.setState({ showIndicator: true });
            searchUser(query)
            .done(users => {
                this.setState({
                    searchResults: users,
                    searchFailed: false,
                    showIndicator: false
                })
            })
            .fail(() => {
                this.setState({
                    searchFailed: true,
                    showIndicator: false
                });
            })
        }
    }

    getAddContactHandler(contact) {
        return () => {
            createRoom([ UserStore.user, contact ])
            this.setState({ searchResults: [] });
            this.refs.searchField.value = "";
        }
    }
}
