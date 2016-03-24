import React, {Component} from "react";
import RegisterForm from "../components/RegisterForm";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getAll()
        }
    }
    componentWillMount() {
        ConfigStore.on("change", () => {
            this.setState({ config: ConfigStore.getAll() });
        });
    }
    render() {
        return <div id="login_wrapper">
            <section id="login" className="container">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <RegisterForm target={this.state.config.serverRoot + this.state.config.apiLocation} wss={this.state.config.wssRoot}>
                            <BaseUrlInput />
                        </RegisterForm>
                    </div>
                </div>
            </section>
        </div>
    }
}
