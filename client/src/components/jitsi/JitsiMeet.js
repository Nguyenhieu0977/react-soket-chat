import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { useFullScreen } from "react-browser-hooks";
import { setJitsiStore } from "../jitsi/JitsiActions"

import ProgressComponent from '@material-ui/core/CircularProgress';

import socketIOClient from "socket.io-client";
import axios from "axios";
// import { toastOnError } from "../../utils/Utils";
import UserList from "../chat/UserList";
import ControlList from "./ControlList";
import { logout } from "../login/LoginActions";
import { getMeetRoom } from "./JitsiActions"

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const JITSI_AUDIO_ALL = "JITSI_AUDIO_ALL";
const JITSI_AUDIO_ONE = "JITSI_AUDIO_ONE";
const SVR_JITSI_AUDIO_ONE = "SVR_JITSI_AUDIO_ONE";
const JITSI_VIDEO_ALL = "JITSI_VIDEO_ALL";
const JITSI_VIDEO_ONE = "JITSI_VIDEO_ONE";
const SVR_JITSI_VIDEO_ONE = "SVR_JITSI_VIDEO_ONE";
const JITSI_FULL_DESKTOP = "JITSI_FULL_DESKTOP";
const JITSI_FULL_ONE = "JITSI_FULL_ONE";
const SVR_JITSI_FULL_ONE = "SVR_JITSI_FULL_ONE";
const JITSI_SHARESCREEN_ONE = "JITSI_SHARESCREEN_ONE";
const SVR_JITSI_SHARESCREEN_ONE = "SVR_JITSI_SHARESCREEN_ONE";

const SOCKET_SERVER_URL = "http://localhost:4000";

const JitsiMeet = () => {

    const { Id } = useParams();
    const user_auth = useSelector((state) => state.auth);
    const roomMeet = useSelector(state => state.jitsi.meetroom)
    // console.log(roomMeet)
    const { jitsiState } = useSelector((state) => state.jitsi);
    console.log(user_auth)
    console.log(jitsiState.stateAudio)
    const [stateAudioAll, setStateAudioAll] = useState(false);
    const [stateAudio, setStateAudio] = useState(false);
    const [stateVideoAll, setStateVideoAll] = useState(false);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(user_auth.user.last_name + " " + user_auth.user.first_name);
    const socketRef = useRef();
    const { toggle, fullScreen } = useFullScreen();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeetRoom(Id));
    }, [])

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout())
    }

    const domain = 'meet.jit.si';
    let api = {};
    const [room, setRoom] = useState("CNTTQK7");
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isTileView, setIsTileView] = useState(false);
    const [dominantSpeaker, setDominantSpeaker] = useState();
    const [displayName2, setDisplayName2] = useState();
    const [participants, setParticipants] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const startMeet = () => {
        const options = {
            roomName: Id,
            width: '100%',
            height: "100%",
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                TILE_VIEW_MAX_COLUMNS: 2,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'hangup', 'fullscreen', 'tileview', 'desktop', 'sharedvideo'],
                // TOOLBAR_BUTTONS: [
                //     'microphone', 'camera', 'desktop', 'embedmeeting', 'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                //     'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
                // ],
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: user,
            }
        }
        api = new window.JitsiMeetExternalAPI(domain, options);
        api.addEventListener('videoConferenceJoined', () => {
            // console.log('Local User Joined');
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
            // displayNameChange: handleDisplayName,
            dominantSpeakerChanged: handleDominantSpeaker,
        });
        api.executeCommand('subject', roomMeet.Subject);
        api.executeCommand('setLargeVideoParticipant', 'abcd1234');
        api.executeCommand('avatarUrl', 'assets/images/avatars/user.jpg');
        // console(api.getNumberOfParticipants())


        dispatch(setJitsiStore(api));
    }

    const handleClose = () => {
        console.log("handleClose");
    }
    const handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await getParticipants();
    }
    const handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await getParticipants();
        setParticipants(data)

    }
    console.log(participants)

    const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await getParticipants();
    }
    const handleVideoConferenceLeft = () => {
        // console.log("handleVideoConferenceLeft");
        return history.push('/');
    }

    const handleMuteStatus = (muted) => {
        // console.log("handleMuteStatus", muted); // { muted: true } 
        // console.log(muted); // { muted: true } 
        setIsAudioMuted(muted.muted)
    }
    console.log(isAudioMuted)

    const handleVideoStatus = (video) => {
        // console.log("handleVideoStatus", video); // { muted: true }
        setIsVideoMuted(video.muted)
    }
    console.log(isVideoMuted)

    const handleTileViewStatus = (tileview) => {
        console.log("handleTileViewStatus", tileview); // { muted: true }
        setIsTileView(tileview.enabled)
    }
    // console.log(isTileView)

    // const handleDisplayName = ({id, displayname}) => {
    //     console.log("handleDisplayName", {id, displayname}); 
    //     setDisplayName2({id, displayname})
    // }
    const handleDominantSpeaker = (speaker) => {
        console.log("handleDominantSpeaker", speaker);
        setDominantSpeaker(speaker.id)
        const dispName = api.getDisplayName(speaker.id)
        setDisplayName2(dispName)
        console.log(dispName)

    }
    // console.log(dominantSpeaker)
    // console.log(displayName2)

    const getParticipants = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events

    const executeCommand = (e) => {
        e.preventDefault();
        api.executeCommand('muteEveryone');
    }

    useEffect(() => {
        if (window.JitsiMeetExternalAPI) {
            startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }, [])


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(
                `${SOCKET_SERVER_URL}/rooms/${Id}/users`
            );
            const result = response.data.users;
            setUsers(result);
        };

        fetchUsers();
    }, [Id]);

    useEffect(() => {
        if (!user) {
            return;
        }
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { Id, name: user, picture: "user.picture" },
        });

        socketRef.current.on("connect", () => {
            console.log(socketRef.current.id);
        });

        socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
            if (user.id === socketRef.current.id) return;
            setUsers((users) => [...users, user]);
        });

        socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
            setUsers((users) => users.filter((u) => u.id !== user.id));
        });

        socketRef.current.on(JITSI_FULL_DESKTOP, (data) => {
            // dispatch(setFullAll(data.fullScreen));
            // api.executeCommand('toggleTileView');
        });

        socketRef.current.on(SVR_JITSI_FULL_ONE, (data) => {
            // dispatch(setFullAll(data.fullScreen));
            console.log(data)
            // toggle()
        });

        socketRef.current.on(SVR_JITSI_SHARESCREEN_ONE, (data) => {
            api.executeCommand('toggleShareScreen');
        });

        socketRef.current.on(JITSI_AUDIO_ALL, (data) => {
            api.executeCommand('muteEveryone');
        });
        socketRef.current.on(SVR_JITSI_AUDIO_ONE, (data) => {
            console.log(data)
            api.executeCommand('toggleAudio');
            setStateAudio(data.stateAudio)
        });

        socketRef.current.on(JITSI_VIDEO_ALL, (data) => {
            api.executeCommand('toggleVideo')
        });
        socketRef.current.on(SVR_JITSI_VIDEO_ONE, (data) => {
            api.executeCommand('toggleVideo');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [Id, user]);

    // const handleAudioJitsi = (event) => {
    //     event.preventDefault();
    //     // setAudioAllJitsi(!audioAllJitsi)
    //     if (!socketRef.current) return;
    //     socketRef.current.emit(JITSI_AUDIO_ALL, {
    //         senderId: socketRef.current.id,
    //     });

    // }

    // const handleVideoJitsi = (event) => {
    //     event.preventDefault();
    //     if (!socketRef.current) return;
    //     socketRef.current.emit(JITSI_VIDEO_ALL, {
    //         senderId: socketRef.current.id,
    //     });
    // }

    // const handleFullDesktop = (event) => {
    //     // event.preventDefault();
    //     // toggle()
    //     if (!socketRef.current) return;
    //     socketRef.current.emit(JITSI_FULL_DESKTOP, {
    //         senderId: socketRef.current.id,
    //     });
    // };

    const handleShareScreenJitsi = (event) => {
        // event.preventDefault();
        // toggle()
        if (!socketRef.current) return;
        socketRef.current.emit(JITSI_SHARESCREEN_ONE, {
            senderId: socketRef.current.id,
        });
    };


    const audioClick = (id) => {
        if (audioClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_AUDIO_ONE, {
                id,
                stateAudio: !stateAudio,
                // senderId: socketRef.current.id,
            });
            console.log(stateAudio)
        }
    }

    const cameraClick = (id) => {
        if (cameraClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_VIDEO_ONE, {
                id,
            })
        }
    }

    const fullClick2 = (id) => {
        if (fullClick2) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_FULL_ONE, {
                id,
            })
        }
    }

    return (
        <div className="main-container ace-save-state" id="main-container">
            {/* <div id="sidebar" className="sidebar responsive  ace-save-state sidebar-fixed sidebar-scroll" style={{ marginLeft: "0px", width: "16%", height: "100%", borderLeft: "solid 1px", borderLeftColor: "#2E6589" }}> */}
            {user_auth.user.is_staff &&
                <div id="sidebar" className="sidebar                  responsive                    ace-save-state sidebar-fixed sidebar-scroll" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">
                    {/* /.sidebar-shortcuts */}
                    <div className="nav-wrap-up pos-rel">
                        <div className="nav-wrap" style={{ maxHeight: "100%" }}>
                            <ul className="nav ace-nav" >
                                <li className="light-blue dropdown-modal" style={{ width: "100%" }}>
                                    <a data-toggle="dropdown" href="#" className="dropdown-toggle" style={{ marginLeft: "-7px" }}>
                                        <img className="nav-user-photo" src="assets/images/avatars/user.jpg" alt="Jason's Photo" />
                                        <span className="user-info"><small>Chào,</small>{user_auth.user.last_name} {user_auth.user.first_name}</span>
                                        <i className="ace-icon fa fa-caret-down" />
                                    </a>
                                    <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                        <li>
                                            <a href="/dashboard"><i className="ace-icon fa fa-cog" />Về trang chủ </a>
                                        </li>
                                        <li className="divider" />
                                        {/* <li onClick={this.onLogout}> */}
                                        <li onClick={handleLogout}>
                                            <a><i className="ace-icon fa fa-power-off" />Đăng xuất</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div style={{ position: 'relative', top: '0px', transitionProperty: 'top', transitionDuration: '0.15s' }}><div className="sidebar-shortcuts" id="sidebar-shortcuts">
                                <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
                                    <span className="menu-text">Điều khiển hệ thống </span>
                                    <ControlList isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} isTileView={isTileView} />
                                </div>
                                <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                                    <ControlList isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} isTileView={isTileView} />
                                </div>
                            </div>

                                <br />
                                <ul className="nav nav-list">
                                    <UserList users={users} audioClick={audioClick} cameraClick={cameraClick} fullClick={fullClick2} stateAudio={stateAudio}></UserList>
                                </ul>
                            </div>
                        </div>
                        <div className="ace-scroll nav-scroll">
                            <div className="scroll-track scroll-active" style={{ display: 'block', height: 252 }}>
                                <div className="scroll-bar" style={{ height: 159, top: 60, transitionProperty: 'top', transitionDuration: '0.1s' }} />
                            </div>
                            <div className="scroll-content" style={{ maxHeight: 252 }}><div style={{ height: 400, width: 8 }} />
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                        <i id="sidebar-toggle-icon" className="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right" />
                    </div>
                </div>
            }
            {roomMeet &&
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* { (user_auth.user.rules == "1" || user_auth.user.rules == "0") && ( */}
                        <div style={{ display: 'flex', height: '100vh', marginRight: '0px', overflow: 'scroll initial' }} >
                            {loading && <ProgressComponent style={{ marginLeft: '45%', marginTop: '25%', width: "100px", height: "100px" }} />}
                            <div style={{ position: 'fixed', marginLeft: '45%', marginTop: '3%', fontSize: "18px", color: "blue", fontWeight: "bold", backgroundColor: "white" }}>{displayName2}</div>
                            <div id="jitsi-iframe" style={jitsiContainerStyle} >

                            </div>

                        </div>
                    </div>
                </div>
            }
        </div >

    );
};

export default withRouter(JitsiMeet);
