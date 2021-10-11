import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { useFullScreen } from "react-browser-hooks";
import { setJitsiStore } from "../jitsi/JitsiActions"
import ProgressComponent from '@material-ui/core/CircularProgress';
import UserList from "../users/UserList";

function CalendarJitsi(props){
    // const { roomId } = props.match.params;
    const {Id, Subject} = props
    const user_auth = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(user_auth.user.username);
    const socketRef = useRef();
    const { toggle, fullScreen } = useFullScreen();


    const dispatch = useDispatch();

    const domain = 'meet.jit.si';
    let api = {};
    const [room, setRoom] = useState("CNTTQK7");
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        setRoom(Subject)
    }, [])

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '300px',
    }

    const startMeet = () => {
        const options = {
            roomName: Id,
            width: '100%',
            height: "300px",
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                TILE_VIEW_MAX_COLUMNS: 2,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'hangup', 'fullscreen', 'tileview', 'desktop', 'sharedvideo'],
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
            videoMuteStatusChanged: handleVideoStatus
        });
        api.executeCommand('subject', Subject);
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
        console.log(data)
    }
    const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await getParticipants();
    }
    const handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        return history.push('/dashboard');
    }

    const handleMuteStatus = (muted) => {
        console.log("handleMuteStatus", muted); // { muted: true } 
        // setIsAudioMuted(muted)
    }

    const handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    const getParticipants = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    useEffect(() => {
        if (window.JitsiMeetExternalAPI) {
            startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }, [])

    return (
        <>

            { (user_auth.user.rules === "1" || user_auth.user.rules === "0") && (
                <div id="sidebar" className="sidebar responsive  ace-save-state ">

                    < ul className="nav nav-list" >
                        <UserList users={users} ></UserList>
                    </ul >
                    <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                        <i id="sidebar-toggle-icon" className="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right" />
                    </div>
                </div>
            )}



            <div style={{ display: 'flex', marginRight: '0px', overflow: 'scroll initial', height: '30vh'   }} >
                {loading && <ProgressComponent style={{marginLeft: '45%', marginTop: '20%', width: '5%', height: '5%'}} />}
                
                <div id="jitsi-iframe" style={jitsiContainerStyle}
                ></div>

            </div>
        </>
    );
};

export default withRouter(CalendarJitsi);
