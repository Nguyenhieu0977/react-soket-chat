import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { getMeetRoom } from "./JitsiActions"
import { getUsers, getProfiles, getProfile } from '../users/UserActions';
import socketIOClient from "socket.io-client";
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const JITSI_AUDIO_ONE = "JITSI_AUDIO_ONE";
const SVR_JITSI_AUDIO_ONE = "SVR_JITSI_AUDIO_ONE";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const SVR_JITSI_AUDIO_ALL = "SVR_JITSI_AUDIO_ALL";
const JITSI_VIDEO_ONE = "JITSI_VIDEO_ONE";
const SVR_JITSI_VIDEO_ONE = "SVR_JITSI_VIDEO_ONE";
const JITSI_VIDEO_ALL = "JITSI_VIDEO_ALL";
const SVR_JITSI_VIDEO_ALL = "SVR_JITSI_VIDEO_ALL";
const JITSI_FILMSTRIP = "JITSI_FILMSTRIP";
const SVR_JITSI_FILMSTRIP = "SVR_JITSI_FILMSTRIP";
const JITSI_TOGGLE_VIEW = "JITSI_TOGGLE_VIEW";
const SVR_JITSI_TOGGLE_VIEW = "SVR_JITSI_TOGGLE_VIEW";
const JITSI_TOGGLE_DESKTOP = "JITSI_TOGGLE_DESKTOP";
const SVR_JITSI_TOGGLE_DESKTOP = "SVR_JITSI_TOGGLE_DESKTOP";
const SVR_JITSI_HANGUP = "SVR_JITSI_HANGUP";
const JITSI_HANGUP = "JITSI_HANGUP";
const SVR_JITSI_HANGUP_ALL = "SVR_JITSI_HANGUP_ALL";
const JITSI_HANGUP_ALL = "JITSI_HANGUP_ALL";
const JITSI_STOP_SHARE = "JITSI_STOP_SHARE";
const SVR_JITSI_STOP_SHARE = "SVR_JITSI_STOP_SHARE";
const JITSI_TILE_VIEW = "JITSI_TILE_VIEW";
const SVR_JITSI_TILE_VIEW = "SVR_JITSI_TILE_VIEW";


const SOCKET_SERVER_URL = "http://localhost:4000";

const JitsiMeetClient = () => {
    const { roomId } = useParams();
    const user_auth = useSelector((state) => state.auth.user);
    const roomMeet = useSelector(state => state.jitsi.meetroom)
    // const profiles = useSelector(state => state.profiles.data);
    const profile = useSelector((state) => state.auth.profile);
    // const [fullname, setFullname] = useState(user_auth.username)
    // conresole.log(profile)
    const fullname = profile.last_name
    const socketRef = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getProfile(user_auth.id))
        // dispatch(getProfiles())
        dispatch(getUsers())
        dispatch(getMeetRoom(roomId));
    }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //       if (profile.last_name !== null || profile.last_name !== "") {
    //         setFullname(profile.last_name)
    //       }
    //     }, 2000);
    //   }, [profile])

    const domain = 'meet.jit.si';
    let api = {};
    const [_api, setApi] = useState();
    const [room, setRoom] = useState("CNTTQK7");

    const [isAudioMuted, setIsAudioMuted] = useState();
    const [isAudioMutedAll, setIsAudioMutedAll] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState();
    const [isTileView, setIsTileView] = useState(false);
    const [isTileViews, setIsTileViews] = useState([]);
    const [isFilmstrip, setIsFilmstrip] = useState(false);
    const [isFullDestop, setIsFullDestop] = useState(false);
    const [dominantSpeaker, setDominantSpeaker] = useState();

    const [jitsiUser, setJitsiUser] = useState();

    // const [raiseHand, setRaiseHand] = useState();
    const [raiseHandNew, setRaiseHandNew] = useState([]);
    const [sharingParticipants, setSharingParticipants] = useState([]);
    // const [endpointTextMessageReceived, setEndpointTextMessageReceived] = useState();

    const [numberOfParticipants, setNumberOfParticipants] = useState();
    // const [incomingMessage, setIncomingMessage] = useState();
    const incomingMessages = ['microphone', 'camera', 'chat', 'hangup', 'fullscreen', 'tileview'];
    // const [outgoingMessage, setOutgoingMessage] = useState();

    // const [displayName2, setDisplayName2] = useState();
    // const [displayName3, setDisplayName3] = useState();
    const [participants, setParticipants] = useState([]);
    const [idLeave, setIdLeave] = useState();
    const [availableDevices, setAvailableDevices] = useState([]);
    // const [stateAudioAll, setStateAudioAll] = useState(false);
    // const [audio_Input, setAudio_Input] = useState();
    // const [audio_Output, setAudio_Output] = useState();
    const [video_Input, setVideo_Input] = useState();
    // const [webcamId, setWebcamId] = useState("");

    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const startMeet = () => {
        if (profile !== null) {
            const options = {
                roomName: 'cnttqk7',
                // password:password,
                width: '100%',
                height: "100%",
                configOverwrite: {
                    localRecording: {
                        enabled: true,
                    },
                    fileRecordingsServiceEnabled: true,
                    fileRecordingsEnabled: true,
                    prejoinPageEnabled: false,
                },
                interfaceConfigOverwrite: {
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                    // TILE_VIEW_MAX_COLUMNS: 4,
                    // TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'hangup', 'desktop', 'tileview', 'fullscreen'],
                },
                parentNode: document.querySelector('#jitsi-iframe'),
                userInfo: { displayName: fullname }
            }
            api = new window.JitsiMeetExternalAPI(domain, options);
            setApi(api)
            api.addEventListener('videoConferenceJoined', (object) => {
                // setMeId(object.id)
                setLoading(false);
            });
            api.addEventListeners({
                readyToClose: handleClose,
                videoConferenceLeft: handleVideoConferenceLeft,
                videoConferenceJoined: handleVideoConferenceJoined,
                audioMuteStatusChanged: handleMuteStatus,
                videoMuteStatusChanged: handleVideoStatus,
                tileViewChanged: handleTileViewStatus,
            });
            api.executeCommand('subject', roomMeet.Subject);
            api.executeCommand('toggleTileView')
        }
    }


    const handleVideoConferenceJoined = async (participant) => {
        // console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        // const data = await getParticipants();
        setJitsiUser(participant)
    }
    const handleVideoConferenceLeft = () => {
        return history.push('/');
    }
    const handleMuteStatus = (muted) => {
        // console.log("handleMuteStatus", muted); // { muted: true } 
        setIsAudioMuted(muted)
    }
    const handleVideoStatus = (video) => {
        // console.log("handleVideoStatus", video); // { muted: true }
        setIsVideoMuted(video)
    }
    const handleTileViewStatus = (tileview) => {
        // console.log("handleTileViewStatus", tileview); // { enabled: true }
        setIsTileView(tileview.enabled)
    }
    const handleClose = () => {
        console.log("handleClose");
    }
    useEffect(() => {
        if (window.JitsiMeetExternalAPI && Object.entries(profile).length !== 0 ) {
            startMeet();
        } 
        // else {
        //     alert('JitsiMeetExternalAPI not loaded');
        // }
    }, [profile])
    //Socket IO
    useEffect(() => {
        if (!fullname || !jitsiUser?.id) {
            return;
        }
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, userId: user_auth.id, fullname, jitsiUserId: jitsiUser?.id, isAudioMuted: isAudioMuted.muted, isVideoMuted: isVideoMuted.muted, isTileView },
        });
        socketRef.current.on("connect", () => {
            console.log(socketRef.current.id);
        });
        socketRef.current.on(SVR_JITSI_AUDIO_ONE, (id) => {
            _api.executeCommand('toggleAudio');
        });
        socketRef.current.on(SVR_JITSI_STOP_SHARE, (id) => {
            _api.executeCommand('toggleShareScreen');
        });
        socketRef.current.on(SVR_JITSI_TILE_VIEW, (id) => {
            _api.executeCommand('toggleTileView');
        });
        socketRef.current.on(SVR_JITSI_AUDIO_ALL, (data) => {
            if (data === roomId)
                _api.executeCommand('toggleAudio');
        });
        socketRef.current.on(SVR_JITSI_VIDEO_ONE, (id) => {
            // console.log(id)
            _api.executeCommand('toggleVideo');
        });
        socketRef.current.on(SVR_JITSI_VIDEO_ALL, (data) => {
            if (data === roomId)
                _api.executeCommand('toggleVideo');
        });
        socketRef.current.on(SVR_JITSI_FILMSTRIP, (data) => {
            if (data === roomId)
                _api.executeCommand('toggleFilmStrip');
        });
        socketRef.current.on(SVR_JITSI_TOGGLE_VIEW, (data) => {
            if (data === roomId)
                _api.executeCommand('toggleTileView');
        });
        socketRef.current.on(SVR_JITSI_HANGUP_ALL, (data) => {
            if (data === roomId)
                _api.executeCommand('hangup');
        });
        socketRef.current.on(SVR_JITSI_HANGUP, (data) => {
            _api.executeCommand('hangup');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, jitsiUser, isAudioMuted, isVideoMuted, isTileView]);

    return (
        <div className="row">
            {loading && <ProgressComponent style={{ marginLeft: '45%', marginTop: '25%', width: "100px", height: "100px" }} />}
            <div className="row" style={{ display: (loading ? 'none' : 'block'), height: '100vh', marginRight: '0px', justifyContent: "center" }}>
                {profile.id !== null &&
                    <div id="jitsi-iframe" style={jitsiContainerStyle} ></div>
                }
            </div>
        </div>
    );
};
export default withRouter(JitsiMeetClient);
