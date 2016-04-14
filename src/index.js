require("./less/index.less");
require("./less/TxtChat.less");
require("./less/MainMenu.less");
require("./less/Profile.less");
require("./less/Contacts.less");
require("bootstrap-webpack");
require("font-awesome-webpack");

import React from "react";
import ReactDom from "react-dom";

import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import NotificationBar from "./components/NotificationBar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import UserStore from "./stores/UserStore";
import {requireAuth} from "./util/auth";


const app = document.getElementById("content");

UserStore.on("change", () => {
    if(!UserStore.authenticated)
        browserHistory.push("/login");
});

ReactDom.render(
<Router history={browserHistory}>
    <Route path="/" component={Layout}>
        <IndexRoute component={Chat} onEnter={requireAuth} />
        <Route path="profile" component={Profile} onEnter={requireAuth}/>
        <Route path="settings" component={Settings} onEnter={requireAuth}/>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
    </Route>
</Router>
, app);
