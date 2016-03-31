import React, {Component} from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/VideoChat";
import TxtChat from "../components/TxtChat";
import SocketStore from "../stores/SocketStore";
import MaxMinStore from "../stores/MaxMinStore";
import UserStore from "../stores/UserInformationStore";
import SmallIcon from "../components/SmallIcon";
import url from "url";
import configStore from "../stores/ConfigStore";
import {refreshIcons} from "../actions/UserActions";
import $ from "jquery";

export default class Profile extends Component {
    componentWillMount() {
        SocketStore.setConnection('ws://localhost:3434');
        MaxMinStore.on("update", this.forceUpdate.bind(this));
    }

    handleSubmit(event) {
        e.preventDefault();
    }

    handleFile(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];
        console.log(file);

        reader.onload = function(upload) {

            $.ajax({
                url: url.resolve(configStore.config.serverRoot + configStore.config.apiLocation, "uploadIcon"),
                method: "POST",
                data: {data: upload.target.result, filename: file.name},
                crossDomain: true
            }).done(oData => {
                refreshIcons();
                console.log(oData);
            });


        };

        reader.readAsDataURL(file);

    }
    
    triggerFileUpload() {
        $('#iconUpload').trigger('click');
    }

    render() {
        let bigImg = (UserStore.getAll().big_icon != null ? UserStore.getAll().big_icon : 'default_big_icon.png');


        return <div id="fluidContainer">
            <Sidebar />

            <section id="mainContent" className={(MaxMinStore.getState().minified) ? "maximized" : ""}>
                <div id="profileBig" style={{background: 'url("src/img/'+bigImg+'") no-repeat; background-size: cover'}}>
                    <div onClick={this.triggerFileUpload.bind(this)}>
                        <SmallIcon />
                    </div>
                    <p>{UserStore.getUsername()}</p>
                </div>

                <p>Username: {UserStore.getUsername()}</p>

                <form style={{display:'none'}} onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <input id="iconUpload" type="file" onChange={this.handleFile} />
                </form>


            </section>


        </div>
    }
}
