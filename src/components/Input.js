import React from "react";
import I18NComponent from "../components/I18NComponent";

export default class Input extends I18NComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.startValue || ""
        }
    }

    render() {
        //Handle all errors
        let error = this.props.error;

        //generate class
        let className = "form-group has-feedback";
        let errorMessage = "";

        if(error) {
            className += " has-error";
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
        const input = <div className={className}>
            <input 
                className="form-control"
                placeholder={ this.props.placeholder || "" }
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                disabled={!!this.props.busy}
                type="text"
                title={errorMessage}
            />
            {(() => {if(error) return errorIndicator})()}
        </div>;


        //render the container
        return <div className="input">
            {input}
        </div>;
    }

    handleChange(oEvent) {
        let value = oEvent.target.value;
        //update the component
        this.setState({
            value
        });

        //call change listener
        if(this.props.onChange)
            this.props.onChange(value);
    }
}
