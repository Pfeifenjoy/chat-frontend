import React, {Component} from "react";


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return <div><button onClick={this.handleX.bind(this)}>{this.state.x}</button></div>;
    }

    handleX() {

    }
}


export default Contact;

