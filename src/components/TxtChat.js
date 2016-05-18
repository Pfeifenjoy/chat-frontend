import React from "react";
import Component from "./Component";
import RoomStore from "../stores/RoomStore";
import { sendTextMessage } from "../actions/RoomActions";

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
            if(room) {
                this.setState({
                    room
                })
            }
        }, "newActiveRoom");

        //Get all messages for this room.
        this.handleEvents(RoomStore, message => {
            if(room === this.state.room) {
                this.setState({ room });
            }
        }, "newMessage");
    }

    render() {
        //        if(!this.state.room) return <div />;
        //
        //        const { members, messages } = this.state.room;
        //
        //        const messageItems = messages
        //        .filter(message => message.type === constants.MESSAGE_TEXT_MESSAGE)
        //        .map(message => {
        //            if(UserStore.userId === message.payload.user.id) {
        //                return <div className="ownMessage">
        //                    <p>{ message.payload.text }</p>
        //                    <img src={message.payload.user.smallIcon} className="circular"/>
        //                </div>
        //            }
        //            else {
        //                return <div className="answerMsg">
        //                    <img src={message.payload.user.smallIcon} className="circular"/>
        //                    <p>{ message.payload.text }</p>
        //                </div>
        //            }
        //        });

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
        //sendTextMessage(message, this.state.room); //TODO
        sendTextMessage(message, { id: "lskdjf" });
    }
}
