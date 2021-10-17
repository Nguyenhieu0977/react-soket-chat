import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { getMeetRoom } from "./JitsiActions"
import Header from "../common/Header";
import Menubar from "../common/Menubar";
import Footer from "../common/Footer";
import { getUsers, getProfiles, getProfile} from '../users/UserActions';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppsIcon from '@material-ui/icons/Apps';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import socketIOClient from "socket.io-client";
import moment from 'moment';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
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

const JitsiMeetAdmin = () => {
    const { roomId } = useParams();
    const user_auth = useSelector((state) => state.auth.user);
    // const profile = useSelector((state) => state.auth.profileUser);
    const roomMeet = useSelector(state => state.jitsi.meetroom)
    const dataUser = useSelector(state => state.users.data);
    const profiles = useSelector(state => state.profiles.data);
    // const profile = useSelector(state => state.profile.data);
    const profile = useSelector((state) => state.auth.profile);
    // console.log(profile)
    const fullname = profile.last_name
    const [users, setUsers] = useState([]);
    const socketRef = useRef();

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUsers())
        // dispatch(getProfile(user_auth.id))
        dispatch(getProfiles())
        dispatch(getMeetRoom(roomId));
    }, [])

    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);

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
    // const [meId, setMeId] = useState();

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
            userInfo: { displayName: fullname, }
        }
        api = new window.JitsiMeetExternalAPI(domain, options);
        setApi(api)
        api.addEventListener('videoConferenceJoined', (object) => {
            // setMeId(object.id)
            setLoading(false);
        });
        api.addEventListeners({
            readyToClose: handleClose,
            participantLeft: handleParticipantLeft,
            participantJoined: handleParticipantJoined,
            videoConferenceJoined: handleVideoConferenceJoined,
            videoConferenceLeft: handleVideoConferenceLeft,
            audioMuteStatusChanged: handleMuteStatus,
            videoMuteStatusChanged: handleVideoStatus,
            tileViewChanged: handleTileViewStatus,
            filmstripDisplayChanged: handleFilmstripDisplayChanged,
            dominantSpeakerChanged: handleDominantSpeaker,
            // avatarChanged: handleAvatarChanged,
            raiseHandUpdated: handleRaiseHandUpdated,
            // endpointTextMessageReceived: handleEndpointTextMessageReceived,
            // incomingMessage: incomingMessageListener,
            // outgoingMessage: outgoingMessageListener,
            contentSharingParticipantsChanged: handleContentSharingParticipantsChanged,
        });
        api.executeCommand('subject', roomMeet.Subject);
        api.executeCommand('toggleTileView')
        // api.executeCommand('avatarUrl', 'assets/images/avatars/user.jpg');
        // api.getCurrentDevices().then(devices => {
        //     setCurrentDevices(devices)
        // });
        api.getAvailableDevices().then(devices => {
            setAvailableDevices(devices)
        });
    }

    const handleClose = () => {
        console.log("handleClose");
    }
    const handleParticipantLeft = async (participant) => {
        // console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        setIdLeave(participant)
    }
    // console.log(_api)
    const handleParticipantJoined = async (participant) => {
        // console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        // setMe_Id(participant)
        console.log(participant)
        const data = await getParticipants();
        setParticipants(data)
        const data2 = await getNumberOf();
        setNumberOfParticipants(data2)
    }
    const handleVideoConferenceJoined = async (participant) => {
        // console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        // const data = await getParticipants();
        setJitsiUser(participant)
    }
    // console.log(jitsiUser?.id)
    const handleVideoConferenceLeft = () => {
        // console.log("handleVideoConferenceLeft");
        return history.push('/');
    }
    const handleMuteStatus = (muted) => {
        // console.log("handleMuteStatus", muted); // { muted: true } 
        setIsAudioMuted(muted)
    }
    // console.log(isAudioMuted)
    const handleVideoStatus = (video) => {
        // console.log("handleVideoStatus", video); // { muted: true }
        setIsVideoMuted(video)
    }
    // console.log(isVideoMuted)
    const handleTileViewStatus = (tileview) => {
        // console.log("handleTileViewStatus", tileview); // { enabled: true }
        setIsTileView(tileview.enabled)
    }
    const handleFilmstripDisplayChanged = (filmstrip) => {
        // console.log("handleTileViewStatus", filmstrip); // { muted: true }
        setIsFilmstrip(filmstrip.visible)
    }
    //Tao nut lenh dieu khien chung
    const handleMuteAudioAll = () => {
        _api.executeCommand('muteEveryone');
        setIsAudioMutedAll(!isAudioMutedAll)
    }
    // Tao nut lenh dieu khien cuc bo
    const handleToggleCameraMirror = () => {
        _api.executeCommand('toggleCameraMirror');
    }
    //Các lenh chua duoc
    // const handleSetVideoQuality = () => {
    //     _api.executeCommand('setVideoQuality', 720);//Chua duoc
    // }
    // const handleSendTones = () => {//Khong duoc
    //     _api.executeCommand('sendTones', {
    //         tones: '12345#',
    //         duration: 200,
    //         pause: 200
    //     });
    // }
    // const handlesStartShareVideo = () => {
    //     _api.executeCommand('startShareVideo', "assets/vdeos/videoqk7.mp4");//Chua duoc
    // }
    // const handlesStopShareVideo = () => {
    //     _api.executeCommand('stopShareVideo');//Chua duoc
    // }
    // Nhan thong bao
    // function incomingMessageListener(object) {
    //     incomingMessages.push(object)
    //     setIncomingMessage(incomingMessages)
    // }
    // useEffect(() => {
    //     incomingMessages.push(incomingMessage)
    // }, [incomingMessage])
    // function outgoingMessageListener(object) {
    //     setOutgoingMessage(object)
    // }
    // console.log(incomingMessage)
    // console.log(availableDevices)
    //Gui thong bao chua duoc
    // const handleEndpointTextMessageReceived = (message) => {
    //     console.log("handleEndpointTextMessageReceived", message); //Chua duoc
    //     setEndpointTextMessageReceived(message)
    // }
    const handleContentSharingParticipantsChanged = (data) => {
        console.log("handleContentSharingParticipantsChanged", data);
        setSharingParticipants(data.data)
    }
    // console.log(sharingParticipants)

    // console.log(endpointTextMessageReceived)
    // const handleSendChatMessage = () => {
    //     // _api.executeCommand('sendEndpointTextMessage', '99eafe21', 'text'); //Khong duoc
    //     _api.executeCommand('sendChatMessage',
    //         {
    //             message: 'Hieu gui sao khong dc',
    //             to: '89e539fa',
    //             ignorePrivacy: false
    //         });
    // }

    // const handleRemoveEventListeners = () => {
    //     _api.removeEventListeners('incomingMessage');//chua duoc
    // }
    // const handleToggleCamera = () => {
    //     _api.executeCommand('toggleCamera');//chua duoc
    // }
    const handleToggleVirtualBackgroundDialog = () => {
        _api.executeCommand('toggleVirtualBackgroundDialog');//chua duoc
    }

    useEffect(() => {
        if (window.JitsiMeetExternalAPI && Object.entries(profile).length !== 0) {
            startMeet();
        } 
        // else {
        //     alert('JitsiMeetExternalAPI not loaded');
        // }
    }, [profile])

    //Nhan va tao bang Thanh vien join
    const handleDominantSpeaker = (speaker) => {
        console.log("DominantSpeaker", speaker);
        setDominantSpeaker(speaker.id)
        // const dispName = api.getDisplayName(speaker.id)
        // setDisplayName2(dispName)
    }
    // const handleAvatarChanged = (aV) => {
        // console.log("handleAvatarChanged", aV);
        // console.log(aV.id);
        // const dispName = api.getDisplayName(aV.id)
        // setDisplayName3(dispName)
    // }
    const handleRaiseHandUpdated = (raise) => {
        // setRaiseHand(raise)
        const index = raiseHandNew.findIndex((rH) => rH.id === raise.id)
        if (index !== -1) {
            const rHCopy = [...raiseHandNew]
            rHCopy[index].handRaised
                ? rHCopy[index].handRaised = false
                : rHCopy[index].handRaised = true
            setRaiseHandNew([...raiseHandNew, rHCopy])
        } else {
            raiseHandNew.push(raise)
            setRaiseHandNew([...raiseHandNew, raiseHandNew])
        }

    }
    // console.log(raiseHandNew)
    const getParticipants = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }
    const getNumberOf = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(api.getNumberOfParticipants());
            }, 500)
        });
    }




    //Nhan va tao select box Audio, Camera
    // const audioInputs = availableDevices.audioInput?.map(au => {
    //     return { "value": au.deviceId, "label": au.label }
    // })
    // const videoInputs = availableDevices.videoInput?.map(v => {
    //     return { "value": v.deviceId, "label": v.label }
    // })
    // const audioOutputs = availableDevices.audioOutput?.map(v => {
    //     return { "value": v.deviceId, "label": v.label }
    // })
    // const handleAudioInput = (audio_Input) => {
    //     setAudio_Input(audio_Input)
    //     _api.setVideoInputDevice(audio_Input.lable, audio_Input.value);
    //     console.log(video_Input)
    // }
    // const handleVideoInput = (video_Input) => {
    //     setVideo_Input(video_Input)
    //     setWebcamId(video_Input.value)
    //     _api.setVideoInputDevice(video_Input.lable, video_Input.value);
    //     // console.log(audio_Input)
    // }
    // const handleAudioOutput = (audio_Output) => {
    //     setAudio_Output(audio_Output)
    //     _api.setVideoInputDevice(audio_Output.lable, audio_Output.value);
    // }
    // const videoConstraints = {
    //     deviceId: webcamId
    // };

    //Socket IO
    useEffect(() => {
        if (!fullname || !jitsiUser?.id) {
            return;
        }
        // socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, userId: user_auth.id, fullname, jitsiUserId: jitsiUser?.id, isAudioMuted: isAudioMuted.muted, isVideoMuted: isVideoMuted.muted, isTileView },
        });
        socketRef.current.on("connect", () => {
            console.log(socketRef.current.id);
        });
        socketRef.current.on(USER_JOIN_CHAT_EVENT, (users) => {
            // if (user.socketId === socketRef.current.id) return;
            setUsers(users);
        });
        socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
            setUsers((users) => users.filter((u) => u.userId !== user_auth.id));
        });
        socketRef.current.on(SVR_JITSI_AUDIO_ONE, (id) => {
            // const index = participants.findIndex(p=>p.participantId===id)
            // if(index !==-1) 
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
        socketRef.current.on(SVR_JITSI_TOGGLE_DESKTOP, (data) => {
            if (data.isFullDestop) {
                _api.executeCommand('setLargeVideoParticipant', data.id);
            } else {
                _api.executeCommand('setLargeVideoParticipant');
            }

        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, jitsiUser, isAudioMuted, isVideoMuted, isTileView]);

    const audioClick = (id) => {
        // console.log(users)
        // console.log(id)
        if (audioClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_AUDIO_ONE,
                // idSocket: socketRef.current.id,
                id
            );
        }
    }
    const videoClick = (id) => {
        if (videoClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_VIDEO_ONE,
                id
            );
        }
    }
    const stopShareVideoClick = (id) => {
        if (stopShareVideoClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_STOP_SHARE,
                id
            );
        }
    }
    const tileViewClick = (id) => {
        if (tileViewClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_TILE_VIEW,
                id
            );
        }
    }
    const handleMuteEveryoneCamera = () => {
        if (handleMuteEveryoneCamera) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_VIDEO_ALL,
                roomId
            );
        }
    }
    const handleMuteEveryone = () => {
        if (handleMuteEveryone) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_AUDIO_ALL,
                roomId
            );
        }
    }
    const handleToggleFilmStrip = () => {
        if (!socketRef.current) return;
        socketRef.current.emit(JITSI_FILMSTRIP,
            roomId
        );
    }
    const handleToggleTileView = () => {
        if (!socketRef.current) return;
        socketRef.current.emit(JITSI_TOGGLE_VIEW,
            roomId
        );
    }
    // const handleToggleDesktopClick = (id) => {
    //     if (!socketRef.current) return;
    //     if(handleToggleDesktopClick){
    //         socketRef.current.emit(JITSI_TOGGLE_DESKTOP,
    //             id
    //         );
    //     }
    //     // setIsFullDestop()
    // }
    const handleLargeVideoParticipant = (id) => {
        if (!socketRef.current) return;
        setIsFullDestop(!isFullDestop)
        socketRef.current.emit(JITSI_TOGGLE_DESKTOP,
            { id, roomId, isFullDestop }
        );
    }
    // console.log(isFullDestop)
    const handleHangupAll = () => {
        if (!socketRef.current) return;
        socketRef.current.emit(JITSI_HANGUP_ALL,
            roomId
        );
    }
    const handleHangup = (id) => {
        if (!socketRef.current) return;
        socketRef.current.emit(JITSI_HANGUP,
            id
        );
    }
    const participantView = participants.map((p, index) => {
        if (p.participantId !== idLeave?.id)
            return (
                <tr key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td style={{ color: "green", fontWeight: "bold" }}>{p.displayName}</td>
                    {/* <td>{p.participantId}</td> */}
                    <td>
                        {raiseHandNew?.find((rH) => rH?.id === p.participantId)?.handRaised ? <i className="ace-icon fa fa-hand-paper-o  green bigger-120" /> : ""}
                        &nbsp;{p.participantId === dominantSpeaker ? (<i className="ace-icon fa fa-volume-up green bigger-120" />) : ""}
                        &nbsp;{sharingParticipants?.find((sP) => sP === p.participantId) ? <i className="ace-icon fa fa-share  green bigger-120" /> : " "}
                    </td>

                    {/* {raiseHand?.find((rH)=> rH.id === p.participantId)?.handRaised} */}
                    <td>
                        <span className="vbar" />
                        <button className="blue" onClick={() => audioClick(p.participantId)} title="Tắt/Mở míc thành viên">
                            {users?.find((u) => u?.jitsiUserId === p.participantId)?.isAudioMuted !== 'true' ? (<i className="ace-icon fa fa-microphone green" />) : (<i className="ace-icon fa fa-microphone-slash red" />)}
                            {/* {users.find((u)=>u.jitsiUserId===p.participantId)?.userId} */}
                        </button>
                        <span className="vbar" />
                        <button className="blue" onClick={() => videoClick(p.participantId)} title="Tắt/Mở Camera thành viên">
                            {users?.find((u) => u?.jitsiUserId === p.participantId)?.isVideoMuted !== 'true' ? (<i className="ace-icon fa fa-video-camera green" />) : (<i className="ace-icon fa fa-video-camera red" />)}
                        </button>
                        <span className="vbar" />
                        <button className="blue" onClick={() => stopShareVideoClick(p.participantId)} title="Tắt/Mở chia sẻ màn hình thành viên">
                            {sharingParticipants?.find((sP) => sP === p.participantId) ? <i className="ace-icon fa fa-share  green " /> : <i className="ace-icon fa fa-share " />}
                        </button>
                        <span className="vbar" />
                        <button className="blue" onClick={() => tileViewClick(p.participantId)} title="Thiết lập kiểu hiển thị thành viên">
                            {users?.find((u) => u?.jitsiUserId === p.participantId)?.isTileView === 'true' ? (<i className="ace-icon fa fa-th green" />) : (<i className="ace-icon fa fa-th red" />)}
                        </button>
                        <span className="vbar" />
                        {/* <button className="blue" onClick={() => handleLargeVideoParticipant(p.participantId)}>
                            <i className="ace-icon fa fa-image red " />
                        </button> */}
                        <span className="vbar" />
                        <button className="blue" onClick={() => handleHangup(p.participantId)} title="Ngắt kết nối thành viên">
                            <i className="ace-icon fa fa-power-off red " />
                        </button>
                    </td>
                </tr>
            )
    });
    const ps = participants.map(p => {
        if (p.participantId !== idLeave?.id)
            return p?.displayName
    })
    const rU = roomMeet.User_room
    const List_user_room = dataUser && rU && dataUser.filter(items => rU.includes(items.id))
    const List_user_room_filter = List_user_room && profiles && List_user_room.filter(items => !ps.includes(profiles?.find(p => p.user === items.id)?.last_name)).map((item, index) => {
        return (
            <tr key={index} >
                {/* <td >
                    {index + ps?.length + 1}
                </td> */}
                <td >
                {profiles && profiles.find(p => p.user === item.id)?.last_name ? profiles?.find(p => p.user === item.id)?.last_name : item.username}
                </td>
                <td >
                    <span ></span>
                </td>
                <td >
                    <span ></span>
                </td>
            </tr>
        )
    })
    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {roomMeet &&
                            <div className="row">
                                {loading && <><b style={{ marginLeft: '40%', marginTop: '30%', width: "100px", height: "100px" }}>Đang kết nối vào hệ thống ...</b> <br/><ProgressComponent style={{ marginLeft: '45%', marginTop: '25%', width: "100px", height: "100px" }} /></>}

                                {/* { (user_auth.user.rules == "1" || user_auth.user.rules == "0") && ( */}
                                {/* <div style={{ display: 'flex', height: '100vh', marginRight: '0px', overflow: 'scroll initial' }} > */}

                                <div className="col-xs-12 col-sm-7"  >
                                    <div className="widget-box" style={{ display: (loading ? 'none' : 'block'), marginRight: '0px' }}>
                                        {/* <div className="widget-header">
                                            <h4 className="widget-title" style={{ textAlign: "center" }}>{roomMeet.Subject}</h4>
                                        </div> */}
                                        <div className="row" style={{ display: 'flex', height: '56vh', marginRight: '0px', justifyContent: "center" }}>
                                            {/* {displayName2 && dominantSpeaker !== meId && <div style={{ position: 'fixed', marginTop: '47vh', fontSize: "18px", fontWeight: "bold", backgroundColor: "gray", color: "white" }}>&nbsp;{displayName2}&nbsp;</div>}
                                            {displayName3 && dominantSpeaker === meId && <div style={{ position: 'fixed', marginTop: '47vh', fontSize: "18px", fontWeight: "bold", backgroundColor: "gray", color: "white" }}>&nbsp;{displayName3}&nbsp;</div>} */}
                                            <div id="jitsi-iframe" style={jitsiContainerStyle} ></div>
                                        </div>
                                    </div>

                                    <div class="widget-box" style={{ display: (loading ? 'none' : 'block'), marginRight: '0px' }}>
                                        <div class="widget-header">
                                            <h5 class="widget-title"><i class="ace-icon fa fa-cog"></i>Thiết lập giao diện hiện thị cho hệ thống</h5>
                                        </div>
                                        <div class="widget-body">
                                            <div className="widget-main" >
                                                <div className="row" style={{ marginLeft: "-12px", marginRight: "-12px" }} >
                                                    <div className="col-xs-12 col-sm-6" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                                        <div className="profile-user-info profile-user-info-striped">
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" > Chọn giao diện </div>
                                                                <div className="profile-info-value" style={{ width: "180px" }} >
                                                                    <span>
                                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleTileView} title="Chọn một hoặc nhiều hình ảnh thành viên">
                                                                            &nbsp;&nbsp;{isTileView && isTileView ? <CropOriginalIcon style={{ fontSize: 17 }} /> : <AppsIcon style={{ fontSize: 17 }} />}&nbsp;&nbsp;
                                                                        </button>
                                                                        {isTileView === false &&
                                                                            <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleFilmStrip} title="Tắt/Mở màn hình các thành viên">
                                                                                &nbsp;&nbsp;{isFilmstrip && isFilmstrip ? <AccountBoxIcon style={{ fontSize: 17 }} /> : <RecentActorsIcon style={{ fontSize: 17 }} />}&nbsp;&nbsp;
                                                                            </button>
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" >Đảo chiều Camera tại chổ</div>
                                                                <div className="profile-info-value">
                                                                    <span>
                                                                        <button className="btn-sm btn-white btn-round" type="button" onClick={handleToggleCameraMirror} title="Đảo chiều Camera">
                                                                            &nbsp;&nbsp;<i className="ace-icon fa fa-camera-retro green bigger-120" />&nbsp;
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" >Thiết lập Market</div>
                                                                <div className="profile-info-value">
                                                                    <span>
                                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleVirtualBackgroundDialog}>
                                                                            &nbsp;&nbsp;<i className="ace-icon fa fa-image green bigger-120" />&nbsp;

                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-sm-6" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                                        <div className="profile-user-info profile-user-info-striped">
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" style={{ width: "210px" }} >Tắt míc tất cả các thành viên </div>
                                                                <div className="profile-info-value" >
                                                                    <span>
                                                                        {/* {isAudioMutedAll &&
                                                                            <button className=" btn-sm btn-white btn-round" type="button" onClick={handleMuteEveryone} title="Mở míc tất cả các thành viên">
                                                                                &nbsp;&nbsp;<i className="ace-icon fa fa-microphone green bigger-120" />&nbsp;&nbsp;
                                                                            </button>
                                                                        } */}
                                                                        {/* { !isAudioMutedAll && */}
                                                                        <button className=" btn-sm btn-white btn-round" type="button" onClick={handleMuteAudioAll} title="Tắt míc tất cả các thành viên">
                                                                            &nbsp;&nbsp;<i className="ace-icon fa fa-microphone-slash red bigger-120" />&nbsp;&nbsp;
                                                                        </button>
                                                                        {/* } */}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" >Tắt Camera tất cả các thành viên </div>
                                                                <div className="profile-info-value">
                                                                    <span>
                                                                        <button className=" btn-sm btn-white btn-round" type="button" onClick={handleMuteEveryoneCamera} title="Tắt Camera tất cả các thành viên">
                                                                            &nbsp;&nbsp;<i className="ace-icon fa fa-video-camera red bigger-120" />&nbsp;
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {/* <div className="profile-info-row">
                                                                <div className="profile-info-name" >Phóng to/Thu nhỏ màn hình</div>
                                                                <div className="profile-info-value">
                                                                    <span>
                                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleDesktop} title="Phóng to/thu nhỏ màn hình">
                                                                            &nbsp;&nbsp;{!fs.fullScreen ? (<i className="ace-icon fa fa-arrows-alt green bigger-120" />) : <i className="ace-icon fa fa-compress red bigger-120" />}&nbsp;&nbsp;
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div> */}
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" >Ngắt tất cả các thành viên</div>
                                                                <div className="profile-info-value">
                                                                    <span>
                                                                        {/* <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={fs.toggle} title="Phóng to/thu nhỏ màn hình"> */}
                                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleHangupAll} title="Tắt phiên họp tất cả các thành viên">
                                                                            &nbsp;&nbsp;<i className="ace-icon fa fa-power-off red bigger-120" />&nbsp;&nbsp;
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-5" style={{ display: (loading ? 'none' : 'block') }} >
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h5 class="widget-title"><i class="ace-icon fa fa-desktop"></i>THÔNG TIN PHÒNG HỌP</h5>
                                        </div>
                                        <div class="widget-body">
                                            <div className="widget-main">
                                                <div class="row" style={{ marginLeft: "-12px", marginRight: "-12px" }}>
                                                    <div className="col-xs-12 col-sm-9" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                                        <div className="profile-user-info profile-user-info-striped">
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" >Tiêu đề hội nghị </div>
                                                                <div className="profile-info-value" style={{ minWidth: "200px" }}>
                                                                    <span>{roomMeet.Subject}</span>
                                                                </div>
                                                            </div>
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" > Địa điểm chủ trì </div>
                                                                <div className="profile-info-value">
                                                                    <span> {roomMeet.Location}</span>
                                                                </div>
                                                            </div>
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name" > Thời gian bắt đầu </div>
                                                                <div className="profile-info-value">
                                                                    <span>{moment(roomMeet.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                                                                </div>
                                                            </div>
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-name"> Thời gian kết thúc </div>
                                                                <div className="profile-info-value">
                                                                    <span>{moment(roomMeet.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-xs-12 col-sm-3" style={{ display: 'flex', paddingLeft: "0px", paddingRight: "0px", justifyContent: "center" }}>
                                                            <Clock
                                                                value={value}
                                                                size={120}
                                                            />
                                                        </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h5 class="widget-title"><i class="ace-icon fa fa-credit-card "></i>Danh sách thành viên hội nghị: {numberOfParticipants} / {List_user_room_filter?.length} thành viên</h5>
                                        </div><div class="widget-body">
                                            <div className="widget-main" style={{ flex: 1, maxHeight: '55vh', overflowY: 'auto' }}>
                                                <div class="row">
                                                    {/* <JitsiControl _api={_api} roomId={roomId} jitsiUser={jitsiUser} participants={participants} raiseHandNew={raiseHandNew} dominantSpeaker={dominantSpeaker} isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} List_user_room={List_user_room} idLeave={idLeave} isFilmstrip={isFilmstrip} isTileView={isTileView} handleToggleTileView={handleToggleTileView} /> */}
                                                    <div className="control-group">
                                                        <div className="dataTables_wrapper form-inline no-footer">
                                                            <table id="simple-table" className="table  table-bordered table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        {/* <th >TT</th> */}
                                                                        <th >Tên thành viên</th>
                                                                        <th >Trạng thái</th>
                                                                        <th >Thao tác</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {participantView}

                                                                    {List_user_room_filter}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>


                                                </div>
                                                {/* <div className="col-xs-12 col-sm-4" style={{ marginLeft: "-10px", paddingRight: "0px" }}>
                            
                        </div> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div >
                </div >
                <Footer />
            </div >
        </>
    );
};
export default withRouter(JitsiMeetAdmin);
