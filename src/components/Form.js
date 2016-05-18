import React from "react";
import Component from "./Component";

export default class Form extends Component {
    render() {
        let errors = this.props.errors || [];
        let errorMessages = errors.map((error, i) => {
            return <div 
                className="alert alert-danger"
                key={i}
            >
                <strong>{error.errorMessage}</strong>
            </div>;
        })
        return <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">{this.props.title}</h3>
            </div>
            <div className="panel-body">
                <form
                    charSet="UTF-8"
                    role="form"
                    onSubmit={this.props.onSubmit}
                >
                    {errorMessages}
                    <fieldset>
                        {this.props.children}
                        <input
                            className="btn btn-lg btn-success btn-block"
                            type="submit"
                            value={this.props.loading ? this.getWord("Loading...") : this.props.submitButtonText}
                        />
                    </fieldset>
                </form>
                {this.props.footer}

            </div>
        </div>

    }
}
