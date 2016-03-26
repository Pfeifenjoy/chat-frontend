import React, {Component} from "react";

export default class TxtChat extends Component {
    render() {
        return <div>
            <div id="topBar">
                    <span className="btn btn-primary" title="Start video">
                        <i className="fa fa-video-camera"></i>
                    </span>

                    <span className="btn btn-danger marginLeft" title="Delete chat">
                        <i className="fa fa-trash"></i>
                    </span>
            </div>
        </div>
    }
}