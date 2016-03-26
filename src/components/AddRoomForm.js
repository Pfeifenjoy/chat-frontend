import React, {Component} from "react";
import {addUser, updateLoadingAdnimation} from "../actions/ContactActions";
import ContactStore from "../stores/ContactStore";


export default class AddRoomForm extends Component {
    constructor(props) {
        super(props);

    }



    render() {

        return <div className="addWrapper">
            <input type="text" name="addRoom" className="newElement" placeholder="New Room"
                   />
           
        </div>
    }

}