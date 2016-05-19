import React from "react";
import Component from "../components/Component";

//components
import Sidebar from "../components/Sidebar";
import TxtChat from "../components/TxtChat";

//stores
import DeviceStore from "../stores/DeviceStore";
import RoomStore from "../stores/RoomStore";
import UserStore from "../stores/UserStore";

//actions
import { startVideo, stopVideo } from "../actions/RoomActions";

const peerConnectionConfig = {
    "iceServers": [
        {
            "urls": "stun:stun.services.mozilla.com"
        }, {
            "urls": "stun:stun.l.google.com:19302"
        }
    ]
}

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            room: RoomStore.activeRoom,
            localVideo: null,
            remoteVideo: null
        }
        this.peerConnection = new RTCPeerConnection(peerConnectionConfig);
        this.peerConnection.onicecandidate = event => {
            if(event.candidate) {
                this.setState({ iceCandidate: event.candidate });
            }
        }
        this.peerConnection.onaddstream = event => {
            this.setState({
                remoteVideo: event.stream
            });
        }
    }
    componentWillMount() {
        //update if the active room changes
        this.handleEvents(RoomStore, room => {
            this.setState({
                room: RoomStore.activeRoom
            })
        }, "activeRoomChange");

        //Get all messages for this room.
        this.handleEvents(RoomStore, message => {
            if(message.room === this.state.room.id) {
                this.setState({ room: RoomStore.activeRoom });
            }
        }, "newMessage");

        this.handleEvents(RoomStore, message => {
            message = RoomStore.activeVideoMessage;
            if(message.room === this.state.room.id && message.sender !== UserStore.user.id) {
                this.handleIncomingVideo(message.candidate);
            }
        }, "videoStart")
    }
    render() {
        if(!this.state.room) return <div />;
        let videoButtonClass = "fa";

        videoButtonClass += this.state.showOwnVideo ? " fa-stop" : " fa-video-camera";
        let topBar = <div className="topBar">
            <span
                className="btn btn-primary"
                title={ this.getWord("Start video") }
                onClick={this.showOwnVideo.bind(this)}
            >
                <i className={videoButtonClass}></i>
            </span>
        </div>

        let localVideo = this.state.localVideo ? <video
            className="localVideo"
            src={window.URL.createObjectURL(this.state.localVideo)}
            autoPlay
            muted
        /> : [];

        let remoteVideo = this.state.remoteVideo ? <video
            className="remoteVideo"
            src={window.URL.createObjectURL(this.state.remoteVideo)}
            autoPlay
            muted
        /> : [];

        let videoChat = <div className="videos">
            {remoteVideo}
            {localVideo}
        </div> 


        return <div className="container-fluid chat">
            {topBar}
            {videoChat}
            <TxtChat />
        </div>
    }

    showOwnVideo() {
        let userMedia = navigator.getUserMedia({
            audio: true,
            video: true
        }, localVideo => {
            this.setState({
                localVideo
            });
            this.startVideo();
        }, error => {
            //TODO
        });
    }

    startVideo() {
        this.peerConnection.addStream(this.state.localVideo);
        let offer = this.peerConnection.createOffer(sdp => {
            this.peerConnection.setLocalDescription(sdp);
            startVideo(sdp, this.state.room)
            .catch(e => {
                //TODO
            });
        }, error => {
            //TODO
        });
    }

    handleIncomingVideo(sdp) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
    }
}
