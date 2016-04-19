import React, {Component} from "react";
import {addContact} from "../actions/ContactActions";
import ContactStore from "../stores/ContactStore";


export default class AddContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        let className = "fa fa-circle-o-notch fa-spin " + (this.state.loading ? " " : "hidden");

        return <div className="addWrapper">
        <input type="text" name="addContact" className="newElement" placeholder="New Contact"
               onKeyDown={this.handleEnter.bind(this)}/>
        <i  className={"addLoader " + className}></i>
        </div>
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
            this.setState({
                loading: true
            })
            addContact(event.target.value)
            .always(() => {
                this.setState({
                    loading: false
                })
            })
        }
    }
}
