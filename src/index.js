require("./less/index.less");
require("./less/TxtChat.less");
require("./less/MainMenu.less");
require("./less/Profile.less");
require("bootstrap-webpack");
require("font-awesome-webpack");

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import NotificationBar from "./components/NotificationBar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


const app = document.getElementById("content");

ReactDom.render(
    <div className="wrapper">
    <NotificationBar />
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login}></IndexRoute>
        </Route>
        <Route path="/app" component={Layout}>
            <IndexRoute component={Chat}></IndexRoute>
        </Route>
        <Route path="/register" component={Layout}>
            <IndexRoute component={Register}></IndexRoute>
        </Route>
        <Route path="/profile" component={Layout}>
            <IndexRoute component={Profile}></IndexRoute>
        </Route>
        <Route path="/settings" component={Layout}>
            <IndexRoute component={Settings}></IndexRoute>
        </Route>
    </Router>
    </div>
, app);
