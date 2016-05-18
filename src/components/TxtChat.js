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
            room: RoomStore.activeRoom
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
            if(message.roomId === this.state.room.id) {
                this.setState({ room: RoomStore.activeRoom });
            }
        }, "newMessage");
    }

    render() {
        if(!this.state.room) return <div />;

        const { members, messages } = this.state.room;

        const messageItems = messages ? messages
        .filter(message => message.type === constants.MESSAGE_TEXT_MESSAGE)
        .map((message, i) => {
            if(UserStore.user.id === message.payload.user.id) {
                return <div key={i} className="ownMessage">
                    <p>{ message.payload.text }</p>
                    <img src={message.payload.user.smallIcon} className="circular"/>
                </div>
            }
            else {
                return <div key={i} className="answerMsg">
                    <img src={message.payload.user.smallIcon} className="circular"/>
                    <p>{ message.payload.text }</p>
                </div>
            }
        }) : [];

        return <div className="txtChat">
            <div className="topBar">
                    <span className="btn btn-primary" title="Start video">
                        <i className="fa fa-video-camera"></i>
                    </span>

                    <span className="btn btn-danger marginLeft" title="Delete chat">
                        <i className="fa fa-trash"></i>
                    </span>
            </div>
            <div className="chatWrapper">
                {messageItems}
            </div>

            <div className="messageField" >
                <textarea
                    name="message"
                    placeholder={ this.getWord("New message") }
                    ref="messageTextArea"
                ></textarea>
                <button 
                    name="send"
                    className="fa fa-arrow-right sendButton"
                    onClick={this.handleSendMessage.bind(this)}
                />
            </div>
        </div>
    }

    handleSendMessage() {
        let message = this.refs.messageTextArea.value;
        sendTextMessage(message, this.state.room);
    }
}
