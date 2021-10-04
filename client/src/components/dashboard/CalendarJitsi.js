import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { useFullScreen } from "react-browser-hooks";
import { setJitsiStore } from "../jitsi/JitsiActions"

import ProgressComponent from '@material-ui/core/CircularProgress';


function CalendarJitsi(props) {
    const { Id, Subject } = props;

    const user_auth = useSelector((state) => state.auth);
    const roomMeet = useSelector(state => state.jitsi.meetroom)
    // console.log(roomMeet)
    const { jitsiState } = useSelector((state) => state.jitsi);
    console.log(user_auth)
    console.log(jitsiState.stateAudio)

    const [user, setUser] = useState(user_auth.user.last_name + " " + user_auth.user.first_name);

    const { toggle, fullScreen } = useFullScreen();

    const dispatch = useDispatch();

    const domain = 'meet.jit.si';
    let api = {};
    // const [room, setRoom] = useState("CNTTQK7");
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
        setParticipants(data)

    }
    console.log(participants)

    const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await getParticipants();
    }
    const handleVideoConferenceLeft = () => {
        // console.log("handleVideoConferenceLeft");
        return history.push('/dashboard');
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
    const handleDominantSpeaker = (speaker) => {
        console.log("handleDominantSpeaker", speaker);
        setDominantSpeaker(speaker.id)
        const dispName = api.getDisplayName(speaker.id)
        setDisplayName2(dispName)
        console.log(dispName)

    }
    // console.log(dominantSpeaker)

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

    return (
        <div style={{ display: 'flex', marginRight: '0px', overflow: 'scroll initial', height: '60vh'  }} >
            {loading && <ProgressComponent style={{ marginLeft: '45%', marginTop: '20%', width: '5%', height: '5%' }} />}

            <div id="jitsi-iframe" style={jitsiContainerStyle} ></div>
        </div>
    );
};

export default withRouter(CalendarJitsi);
