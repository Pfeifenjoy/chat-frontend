import React from "react";
import Component from "../components/Component";

//Components
import Form from "../components/Form";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";

//stores
import UserStore from "../stores/UserStore";

//actions
import { updateUser } from "../actions/UserActions";

//utils
import { arrayToObject, objectToArray } from "../util/data-types";

//static resources
const standardIconSrc = require("../img/default_icon.png");

export default class Chat extends Component {
    constructor() {
        super();

        this.state = {
            userErrors: {},
            passwordErrors: {},
            username: UserStore.username,
            oldpassword: "",
            newpassword: "",
            email: UserStore.email,
            loading: false
        }
    }

    render() {
        const iconSrc = UserStore.bigIcon || standardIconSrc;
        const settingsHeader = <div className="settingsHeader container-fluid">
            <div className="row">
                <div className="headerSpacer" />
            </div>
            <div className="row row-centered">
                <img className="logo col-lg-1 col-centered" src={iconSrc} />
            </div>
            <div className="row row-centered">
                <p className="col-centered">{ UserStore.username }</p>
            </div>
        </div>

        //generate the input fields
        const username = <Input 
            onChange={this.handleUsernameChange.bind(this)}
            placeholder={this.getWord("Username")}
            error={this.state.userErrors.username}
            busy={this.state.loading}
            startValue={this.state.username}
        />;
        const email = <Input
            onChange={this.handleEmailChange.bind(this)}
            placeholder={this.getWord("Email")}
            error={this.state.userErrors.email}
            busy={this.state.loading}
            startValue={this.state.email}
        />

        let userErrorMessages = objectToArray(this.state.userErrors)

        const userForm = <Form
            onSubmit={this.handleUserSubmit.bind(this)}
            submitButtonText={this.getWord("Change User")}
            title={this.getWord("User Settings")}
            errors={userErrorMessages}
            loading={this.state.loading}
        >
            {username}
            {email}
        </Form>

        const oldpassword = <PasswordInput 
            onChange={this.handleOldpasswordChange.bind(this)}
            error={this.state.passwordErrors.oldpassword}
            busy={this.state.loading}
            placeholder={this.getWord("Old Password")}
        />;
        const newpassword = <PasswordInput 
            onChange={this.handleNewpasswordChange.bind(this)}
            error={this.state.passwordErrors.newpassword}
            busy={this.state.loading}
            placeholder={this.getWord("New Password")}
        />;

        let passwordErrorMessages = objectToArray(this.state.passwordErrors);

        const passwordForm = <Form
            onSubmit={this.handlePasswordSubmit.bind(this)}
            submitButtonText={this.getWord("Change Password")}
            title={this.getWord("Password Settings")}
            errors={passwordErrorMessages}
            loading={this.state.loading}
        >
            {newpassword}
            {oldpassword}
        </Form>

        const settingsBody = <div className="settingsBody container-fluid">
            <div className="row row-centered">
                <div className="col-lg-4 col-centered">
                    {userForm}
                </div>
            </div>
            <div className="row row-centered">
                <div className="col-lg-4 col-centered">
                    {passwordForm}
                </div>
            </div>
        </div>

        return <div className="settings container-fluid">
            {settingsHeader}
            {settingsBody}
        </div>
    }

    handleUsernameChange(username) {
        this.setState({ username });
    }

    handleOldpasswordChange(oldpassword) {
        this.setState({ oldpassword });
    }

    handleNewpasswordChange(newpassword) {
        this.setState({ newpassword });
    }

    handleEmailChange(email) {
        this.setState({ email });
    }

    handleUserSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        updateUser({
            username: this.state.username,
            email: this.state.email
        })
        .fail(response => {
            let userErrors = arrayToObject(JSON.parse(response.responseText).errors, "field");
            this.setState({
                userErrors
            })
        })
        .always(() => {
            this.setState({
                loading: false
            })
        })
    }

    handlePasswordSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        updateUser({
            newpassword: this.state.newpassword,
            oldpassword: this.state.oldpassword
        })
        .fail(response => {
            let passwordErrors = arrayToObject(JSON.parse(response.responseText).errors, "field");
            this.setState({
                passwordErrors
            })
        })
        .always(() => {
            this.setState({
                loading: false
            })
        })
    }
}
