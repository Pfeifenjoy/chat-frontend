import React from "react";
import Component from "./Component";
import { sendTextMessage } from "../actions/RoomActions";
import constants from "../constants";

//stores
import RoomStore from "../stores/RoomStore";
import UserStore from "../stores/UserStore";

export default class TxtChat extends Component {

    constructor() {
        super();
        this.state = {
            room: RoomStore.activeRoom,
            textarea: "",
            messageFailed: false
        }
    }

    componentWillMount() {
        //update if the active room changes
        this.handleEvents(RoomStore, room => {
            this.setState({
                room: RoomStore.activeRoom
            })
        }, "activeRoomChange");

        //Get all messages for this room.
        this.handleEvents(RoomStore, message => {
            if(message.room === this.state.room.id) {
                this.setState({ room: RoomStore.activeRoom });
            }
        }, "newMessage");
    }

    render() {

        const { members, messages } = this.state.room;

        const messageItems = messages ? messages
        .map((message, i) => {
            let user = members.find(member => member.id === message.author);
            if(UserStore.user.id === message.author) {
                return <div key={i} className="ownMessage">
                    <p>{ message.content }</p>
                    <img src={message.author.smallIcon} className="circular"/>
                </div>
            }
            else {
                return <div key={i} className="answerMsg">
                    <img src={message.author.smallIcon} className="circular"/>
                    <p>{ message.content }</p>
                </div>
            }
        }) : [];

        const errorIndicator = this.state.messageFailed ? <span 
            className="fa fa-3x fa-exclamation error-indicator"
        ></span> : [];

        return <div className="txtChat">
            <div className="chatWrapper">
                {messageItems}
            </div>

            <div className="messageField" >
                {errorIndicator}
                <textarea
                    name="message"
                    placeholder={ this.getWord("New message") }
                    ref="messageTextArea"
                    className="has-error"
                    value={ this.state.textarea }
                    onChange={ this.handleTextareaChange.bind(this) }
                ></textarea>
                <button 
                    name="send"
                    className="fa fa-arrow-right sendButton"
                    onClick={this.handleSendMessage.bind(this)}
                />
            </div>
        </div>
    }

    handleTextareaChange(event) {
        let textarea = event.target.value;
        this.setState({ textarea });
    }

    handleSendMessage() {
        this.setState({ messageFailed: false });
        let message = this.refs.messageTextArea.value;
        let timeout = setTimeout(() => {
            this.setState({ messageFailed: true });
        }, 3000);
        sendTextMessage(message, this.state.room)
        .then(() => {
            clearTimeout(timeout);
            this.setState({ textarea: "" });
        })
        .catch((e) => {
            clearTimeout(timeout);
            this.setState({
                messageFailed: true
            });
        })
    }
}
