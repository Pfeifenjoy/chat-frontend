import React, {Component} from "react";
import NotifyStore from "../stores/NotifyStore";
import {newNotify} from "../actions/NotifyActions";
import {refreshContacts} from "../actions/ContactActions";

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

var localVideo;
var remoteVideo;
var peerConnection;
var serverConnection;
var localStream;
var peerConnectionConfig = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}]};


export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonActive: false,
            
        };

        this.notify = NotifyStore.getNotify();
        this._isMounted = false;
    }

    componentWillMount() {
        NotifyStore.on("notify", this.updateNotify.bind(this));
    }

    componentDidMount() {
        this._isMounted = true;
        this.pageReady();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    
    updateNotify() {
        if(this._isMounted) {
            this.notify = NotifyStore.getNotify();

            this.forceUpdate();
        }
    }

    render() {
      
        return <div id="videos">
                    <input type="button"  className={this.state.buttonActive ? "btn btn-danger" : "btn btn-info"} id="start" onClick={this.startIt.bind(this)} value={this.state.buttonActive ? "Stop video" : "Start video"}></input>
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

        if(this.state.buttonActive) {
            serverConnection.send(JSON.stringify({'conState': 'close'}));
            //stopVideo();
        } 
        else {
            this.start(true);
        }

        this.setState({buttonActive: !this.state.buttonActive});

    } 

    pageReady() {
        console.log("page ready called");
        localVideo = document.getElementById('localVideo');
        remoteVideo = document.getElementById('remoteVideo');
        

        localStream = null;
        peerConnection = null;
        serverConnection = null;


        serverConnection = new WebSocket((location.protocol === "http:" ? "ws://" : "wss://") + location.host);
        //serverConnection = new WebSocket('wss://ne4y-dev.de/ws');
        serverConnection.onmessage = this.gotMessageFromServer.bind(this);
        serverConnection.onclose = () => {console.log("closed")};

        var constraints = {
            video: true,
            audio: true,
        };

        if(navigator.getUserMedia) {
            navigator.getUserMedia(constraints, this.getUserMediaSuccess, this.getUserMediaError);
        } else {
            alert('Your browser does not support getUserMedia API');
        }
    }

    start(isCaller) {
        peerConnection = new RTCPeerConnection(peerConnectionConfig);
        console.log("peerConnection set");
        peerConnection.onicecandidate = this.gotIceCandidate;
        peerConnection.onaddstream = this.gotRemoteStream.bind(this);
        console.log("set stream");
        peerConnection.addStream(localStream);

        if(isCaller) {
            peerConnection.createOffer(this.gotDescription.bind(this), this.createOfferError.bind(this));
        }
        else {
            console.log("no peer connection");
            peerConnection.createOffer(this.gotDescription.bind(this), this.createOfferError.bind(this));
        }

        setInterval(() => { if(peerConnection == undefined) { clearInterval(this)}  if(peerConnection != undefined && peerConnection.iceConnectionState == "disconnected") { this.stopVideo.bind(this)(); clearInterval(this);}}, 500);
        
    }

    getUserMediaSuccess(stream) {
        console.log("getUserMediaSuccess");
        localStream = stream;
        localVideo.src = window.URL.createObjectURL(stream);
    }

    getUserMediaError(error) {
        console.log("erro");
        console.log(error);
    }

    gotDescription(description) {
        console.log('got description');
        console.log(description);
        peerConnection.setLocalDescription(description, function () {
            serverConnection.send(JSON.stringify({'sdp': description}));
        }, function() {console.log('set description')});
}

    gotIceCandidate(event) {
        console.log("got ice candidate");
        if(event.candidate != null) {
            serverConnection.send(JSON.stringify({'ice': event.candidate}));
        }
    }

    gotRemoteStream(event) {
        newNotify(true, "Video started");
        //this.state.notify.setNotify("Video starts");
        
        //console.log("got remote stream");
        remoteVideo.src = window.URL.createObjectURL(event.stream);
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
    
    gotMessageFromServer(message) {
        //console.log("got message from server");
        //console.log(message);




        var signal = JSON.parse(message.data);

        if (signal.update != undefined) {
            refreshContacts();
        }
        else {

            if (signal.conState) {
                this.stopVideo();
            }
            else {
                if (!peerConnection) this.start(false);

                if (signal.sdp) {
                    peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), () => {
                        peerConnection.createAnswer(this.gotDescription.bind(this), this.createAnswerError.bind(this));
                    }, this.bindError.bind(this));
                } else if (signal.ice) {
                    //console.log(signal.ice);

                        peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));

                }
            }

            //console.log(peerConnection.connectionState);
        }
    }

    getServerCon() {
        return serverConnection;
    }

    stopVideo() {
        newNotify(true, "Video stopped");
        //console.log("video will be stoppedn");
        var videos = document.getElementsByTagName("video");
        for (var i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
        
        peerConnection.close();
        document.getElementById("remoteVideo").style.display = 'none';
        this.pageReady();
        this.setState({buttonActive: false});
        //this.state.notify.bind(this).setNotify("Video has been stopped");
       
        
        



    }

}


