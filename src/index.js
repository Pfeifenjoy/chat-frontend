//require all dependencies
require("./less/index.less");
require("bootstrap-webpack");
require("font-awesome-webpack");

//Get all react components
import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

//get all pages
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Layout from "./pages/Layout";
import AuthenticationLayout from "./pages/AuthenticationLayout";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

//Get helper functions
import UserStore from "./stores/UserStore";
import { requireAuth } from "./util/auth";


const app = document.getElementById("content");

UserStore.on("change", () => {
    if(!UserStore.authenticated)
        browserHistory.push("/login");
});

//render the application
ReactDom.render(
<Router history={browserHistory}>
    <Route path="/" component={Layout} onEnter={requireAuth}>
        <IndexRoute component={Chat} />
        <Route path="profile" component={Profile} />
        <Route path="settings" component={Settings} />
    </Route>
    <Route path="/" component={AuthenticationLayout}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
    </Route>
</Router>
, app);
