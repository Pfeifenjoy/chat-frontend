import React, { Component } from "react";
import UserStore from "../stores/UserStore";

const AuthenticationLayout = React.createClass({
    //Require the context of the router
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            authenticated: UserStore.authenticated
        };
    },
    componentWillMount() {
        //handle the authenticatio of a user.
        this.handleAuthentication = () => {
            //change the state
            this.setState({
                authenticated: UserStore.authenticated
            });
            //route to the next site.
            if(UserStore.authenticated) {
                const { location } = this.props;

                if(location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname);
                }

                else {
                    this.context.router.replace("/");
                }
            }

        }
        //register authentication handler
        UserStore.on("change", this.handleAuthentication);
    },

    componentWillUnmount() {
        //clean up listeners
        UserStore.removeListener("change", this.handleAuthentication);
    },



    render() {
        return <section className="authentication constainer-fluid">
            <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
                {this.props.children}
            </div>
        </section>;
    }

});

export default AuthenticationLayout;
