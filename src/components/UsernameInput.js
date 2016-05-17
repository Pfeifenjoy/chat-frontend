import React from "react";
import I18NComponent from "../components/I18NComponent";

export default class UsernameInput extends I18NComponent {
    constructor() {
        super();
        this.state = {
            username: ""
        }
    }

    render() {
        //Render the input field
        const username = <div className="form-group has-feedback">
            <input 
                className="form-control"
                placeholder={ this.getWord("Username") }
                value={this.state.username}
                onChange={this.handleUsernameChange.bind(this)}
                name="username"
                disabled={!!this.props.busy}
                type="text"
            />
        </div>;

        //render the container
        return <div className="username-input">
            {username}
        </div>;
    }

    handleUsernameChange(oEvent) {
        let username = oEvent.target.value;
        //update the component
        this.setState({
            username
        });

        //call change listener
        if(this.props.onChange)
            this.props.onChange(username);
    }
}
