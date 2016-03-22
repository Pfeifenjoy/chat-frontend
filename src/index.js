require("./less/index.less");
require("bootstrap-webpack");

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Layout from "./pages/Layout";
import Sidebar from "./pages/Sidebar";

const app = document.getElementById("content");

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login}></IndexRoute>
        </Route>
        <Route path="/app" component={Layout}>
            <IndexRoute component={Chat}></IndexRoute>
        </Route>
    </Router>
, app);
