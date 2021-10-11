import React, { useState, useEffect, useCallback } from 'react';
import { useFullScreen } from "react-browser-hooks";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { setJitsiStore } from "../jitsi/JitsiActions"
// import useJitsi from './useJitsi';

const Jitsi = () => {
    const jitsiStore = useSelector((state) => state.jitsi);
    const user_auth = useSelector((state) => state.auth);
    // console.log(audioAllJitsi)
    const jitsiContainerId = "jitsi-container-id";

    const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise = null;

        const loadJitsiScriptPromise = new Promise((resolve) => {
            resolveLoadJitsiScriptPromise = resolve;
        });

        const script = document.createElement("script");
        script.src = "https://localhost:8443/external_api.js";
        script.async = true;
        script.onload = resolveLoadJitsiScriptPromise
        document.body.appendChild(script);

        return loadJitsiScriptPromise;
    };


    const [jitsi, setJitsi] = useState({});
    const [toggleVideoClick, setToggleVideoClick] = useState(false);
    const [toggleAudioClick, setToggleAudioClick] = useState(false);
    const [toggleScreen, setToggleScreen] = useState(false);
    const [participants, setParticipants] = useState({});
    const [participantNumbers, setParticipantNumbers] = useState();
    const [loading, setLoading] = useState(true);

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const initialiseJitsi = async () => {
        if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
        }
        const _jitsi = new window.JitsiMeetExternalAPI("localhost:8443", {
            roomName: 'CNTTQK7',
            userInfo: {
                email: user_auth.user.email,
            },
            parentNode: document.getElementById(jitsiContainerId),
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                // DEFAULT_REMOTE_DISPLAY_NAME: user_auth.user.username,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                TILE_VIEW_MAX_COLUMNS: 2,
                // TOOLBAR_BUTTONS: ['chat', 'camera', 'microphone']
            },
        });
        setJitsi(_jitsi)
        _jitsi.addEventListener('videoConferenceJoined', () => {
            //   console.log('Local User Joined');
            setLoading(false);
            _jitsi.executeCommand('displayName', user_auth.user.username);
        });
        if (!toggleAudioClick) _jitsi.executeCommand('toggleAudio')
        if (!toggleVideoClick) _jitsi.executeCommand('toggleAudio')
        console.log(toggleAudioClick)
    };

    useEffect(() => {
        initialiseJitsi();

        return () => {
            jitsi?.dispose?.();

        };
    }, [])

    useEffect(() => {
        return () => {
            setToggleAudioClick(jitsiStore.audioAllJitsi);
        }
    }, [jitsiStore.audioAllJitsi]);

    return (
        <div
            style={{ display: 'flex', height: '92.6vh', marginRight: '-12px', overflow: 'scroll initial' }}
        >
            {loading && <ProgressComponent />}
            <div id={jitsiContainerId} style={jitsiContainerStyle} />
            {/* <button onClick={toggleAudioClick}>Audio Test</button> */}
        </div>
    )
}
export default withRouter(Jitsi);