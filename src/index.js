require("./less/index.less");
require("bootstrap-webpack");

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Login from "./pages/Login";
import Layout from "./pages/Layout";

const app = document.getElementById("content");

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login}></IndexRoute>
        </Route>
    </Router>
, app);
