import React, {Component} from "react";

export default class Layout extends Component {
    render() {
        return <div className="wrapper">
                    <div className="container">
                        <h1>Chat</h1>
                        {this.props.children}
                    </div>
                </div>;
    }
}
