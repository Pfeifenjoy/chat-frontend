import React from "react";
import I18NComponent from "../components/I18NComponent";

export default class PasswordInput extends I18NComponent {
    constructor() {
        super();
        this.state = {
            password: ""
        }
    }

    render() {
        //state
        const { password } = this.state;

        let error = this.props.error;

        //generate class
        let passwordClass = "form-group has-feedback";
        let errorMessage = "";

        if(error) {
            passwordClass += " has-error";
            errorMessage = error.errorMessage;
        }

        const errorIndicator = <span
                className="form-control-feedback"
            >
                <span 
                    className="fa fa-exclamation"
                />
        </span>
        
        //Render the input field
        const passwordInput = <div className={passwordClass}>
            <input 
                className="form-control"
                placeholder={ this.props.placeholder || this.getWord("Password") }
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                name="password"
                disabled={!!this.props.busy}
                type="password"
                title={errorMessage}
            />
            {(() => {if(error) return errorIndicator})()}
        </div>;

        //render the container
        return <div className="password-input">
            {passwordInput}
        </div>;
    }

    handlePasswordChange(oEvent) {
        let password = oEvent.target.value;
        //update the component
        this.setState({
            password
        });

        //call change listener
        if(this.props.onChange)
            this.props.onChange(password);
    }
}
