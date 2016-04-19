import React, {Component} from "react";
import MaxMinStore from "../stores/MaxMinStore";
import RoomStore from "../stores/RoomStore";

export default class TxtChat extends Component {

    constructor() {
        super();
        this.state = {
            room: RoomStore.activeRoom,
        }
    }

    componentWillMount() {
        MaxMinStore.on("update", this.forceUpdate.bind(this));
        RoomStore.on("newActiveRoom", () => {
            if(RoomStore.activeRoom) {
                this.setState({
                    room: RoomStore.activeRoom
                })
            }
        });
    }

    render() {
        return <div className="marginLeft">
            <div id="topBar">
                    <span className="btn btn-primary" title="Start video">
                        <i className="fa fa-video-camera"></i>
                    </span>

                    <span className="btn btn-danger marginLeft" title="Delete chat">
                        <i className="fa fa-trash"></i>
                    </span>
            </div>
            <div id="chatWrapper" className={MaxMinStore.getState().minified ? "maximized" : ""}>
                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Hi was geht ab?</p>
                </div>

                <div className="ownMessage">
                    <p>Nicht viel und bei dir?</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Auch nicht so viel.</p>
                </div>

                <div className="ownMessage">
                    <p>Na dann...</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Hi was geht ab?</p>
                </div>

                <div className="ownMessage">
                    <p>Nicht viel und bei dir?</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Auch nicht so viel.</p>
                </div>

                <div className="ownMessage">
                    <p>Na dann...</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Hi was geht ab?</p>
                </div>

                <div className="ownMessage">
                    <p>Nicht viel und bei dir?</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Auch nicht so viel.</p>
                </div>

                <div className="ownMessage">
                    <p>Na dann...</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Hi was geht ab?</p>
                </div>

                <div className="ownMessage">
                    <p>Nicht viel und bei dir?</p>
                </div>

                <div className="answerMsg">
                    <img src="src/img/small_icon.jpg" className="circular"/>
                    <p>Auch nicht so viel.</p>
                </div>

                <div className="ownMessage">
                    <p>Na dann...</p>
                </div>

            </div>

            <div id="messageField" className={MaxMinStore.getState().minified ? "maximized" : ""}>
                <textarea name="message" placeholder="New message"></textarea>
            </div>
        </div>
    }
}
