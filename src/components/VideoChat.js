import React, {Component} from "react";
import NotifyStore from "../stores/NotifyStore";
import {newNotify} from "../actions/NotifyActions";
import {refreshContacts} from "../actions/ContactActions";
import SocketStore from "../stores/SocketStore";

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;


export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonActive: false,
            localVideo: null,
            remoteVideo: null,
            localStream: null,
            peerConnection: null,
            peerConnectionConfig: {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}]}
        };

        this.notify = NotifyStore.getNotify();
        this._isMounted = false;
    }

    componentWillMount() {
        NotifyStore.on("notify", this.updateNotify.bind(this));
        SocketStore.on("update", this.updateSocket.bind(this));
        SocketStore.on("videoMsg", this.gotMessageFromServer.bind(this));
    }

    componentDidMount() {
        this._isMounted = true;
        this.pageReady();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    updateNotify() {
        if (this._isMounted) {
            console.log("update notify");
            this.notify = NotifyStore.getNotify();

            this.forceUpdate();
        }
    }

    updateSocket() {
        if (this._isMounted) {
            console.log("update socket");

        }
    }

    render() {

        return <div id="videos">
            <input type="button" className={this.state.buttonActive ? "btn btn-danger" : "btn btn-info"} id="start"
                   onClick={this.startIt.bind(this)}
                   value={this.state.buttonActive ? "Stop video" : "Start video"}></input>
            <div className="clear"></div>
            <video id="localVideo" autoPlay muted></video>
            <video id="remoteVideo" autoPlay muted></video>

            <br />

            <div className="clear"></div>
            <div id="notifyBox" className={(this.notify.active) ? 'notifyActive' : 'inactive'}>
                {this.notify.message}
            </div>
        </div>

    }


    startIt(oEvent) {
        if (this.state.buttonActive) {
            SocketStore.send(JSON.stringify({'conState': 'close'}));
            //stopVideo();
        }
        else {
            this.start(true);
        }

        this.setState({buttonActive: !this.state.buttonActive});

    }

    pageReady() {
        console.log("page ready called");
        this.state.localVideo = document.getElementById('localVideo');
        this.state.remoteVideo = document.getElementById('remoteVideo');


        this.state.localStream = null;
        this.state.peerConnection = null;


        var constraints = {
            video: true,
            audio: true,
        };

        if (navigator.getUserMedia) {
            navigator.getUserMedia(constraints, this.getUserMediaSuccess.bind(this), this.getUserMediaError);
        } else {
            alert('Your browser does not support getUserMedia API');
        }
    }

    start(isCaller) {
        this.state.peerConnection = new RTCPeerConnection(this.state.peerConnectionConfig);
        console.log("peerConnection set");
        this.state.peerConnection.onicecandidate = this.gotIceCandidate.bind(this);
        this.state.peerConnection.onaddstream = this.gotRemoteStream.bind(this);
        console.log("set stream");
        this.state.peerConnection.addStream(this.state.localStream);

        if (isCaller) {
            this.state.peerConnection.createOffer(this.gotDescription.bind(this), this.createOfferError.bind(this));
        }
        else {
            console.log("no peer connection");
            this.state.peerConnection.createOffer(this.gotDescription.bind(this), this.createOfferError.bind(this));
        }

        setInterval(() => {
            if (this.state.peerConnection == undefined) {
                clearInterval(this)
            }
            if (this.state.peerConnection != undefined && this.state.peerConnection.iceConnectionState == "disconnected") {
                this.stopVideo.bind(this)();
                clearInterval(this);
            }
        }, 500);

    }

    getUserMediaSuccess(stream) {
        console.log("g etUserMediaSuccess");
        this.state.localStream = stream;
        this.state.localVideo.src = window.URL.createObjectURL(stream);
    }

    getUserMediaError(error) {
        console.log("erro");
        console.log(error);
    }

    gotDescription(description) {
        console.log('got description');
        console.log(description);
        this.state.peerConnection.setLocalDescription(description, () => {
            SocketStore.send(JSON.stringify({'sdp': description}));
        }, function () {
            console.log('set description')
        });
    }

    gotIceCandidate(event) {
        console.log("got ice candidate");
        if (event.candidate != null) {
            SocketStore.send(JSON.stringify({'ice': event.candidate}));
        }
    }

    gotRemoteStream(event) {
        newNotify(true, "Video started");
        //this.state.notify.setNotify("Video starts");

        //console.log("got remote stream");
        this.state.remoteVideo.src = window.URL.createObjectURL(event.stream);
        document.getElementById("remoteVideo").style.display = 'block';
        this.setState({buttonActive: true});


    }

    createOfferError(error) {
        console.log(error);
    }

    createAnswerError() {
        //console.log("create answer error");
        //remoteVideo.style.display = 'none';
    }

    bindError() {
        console.log("error");
    }

    gotMessageFromServer() {
        console.log("got message from server");

        //console.log(message);


        var signal = SocketStore.getVideoMsg();
        console.log(signal);


        if (signal.conState) {
            console.log("conState");
            this.stopVideo();
        }
        else {
            if (!this.state.peerConnection) this.start(false);

            if (signal.sdp) {
                this.state.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), () => {
                    this.state.peerConnection.createAnswer(this.gotDescription.bind(this), this.createAnswerError.bind(this));
                }, this.bindError.bind(this));
            } else if (signal.ice) {
                //console.log(signal.ice);

                this.state.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));

            }
        }

        //console.log(peerConnection.connectionState);

    }

    getServerCon() {
        return this.state.serverConnection;
    }

    stopVideo() {
        console.log("stop video, new notify");
        newNotify(true, "Video stopped");
        console.log("video will be stoppedn");
        var videos = document.getElementsByTagName("video");
        for (var i = 0; i < videos.length; i++) {
            videos[i].pause();
        }

        this.state.peerConnection.close();
        console.log("peerConnection close");
        document.getElementById("remoteVideo").style.display = 'none';
        console.log("page Ready");
        this.pageReady();
        this.setState({buttonActive: false});
        //this.state.notify.bind(this).setNotify("Video has been stopped");


    }

}


