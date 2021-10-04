import React, { useState, useEffect } from 'react';
import { useFullScreen } from "react-browser-hooks";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

const Jitsi = () => {

  const user_auth = useSelector((state) => state.auth);
  console.log(user_auth.user.username)

  const jitsiContainerId = "jitsi-container-id";

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };


  const [jitsi, setJitsi] = useState({});
  const [participants, setParticipants] = useState({});
  const [participantNumbers, setParticipantNumbers] = useState();

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: 'CNTTQK7',
      userInfo: {
        email: user_auth.user.email,
        displayName: user_auth.user.username
      },
      parentNode: document.getElementById(jitsiContainerId),
    });
    setJitsi(_jitsi)
  };

  useEffect(() => {
    initialiseJitsi();
    return () => jitsi?.dispose?.();
  }, []);

  useEffect(()=>{
    const numberMember = jitsi.getNumberOfParticipants();
    console.log(numberMember)
  })

  // jitsi.executeCommand('toggleAudio');

  
  
  
  console.log(jitsi)
  // console.log(jitsi.N._participants)

  const { toggle, fullScreen } = useFullScreen();
  return (

    <div
      style={{ display: 'flex', height: '92.6vh', marginRight: '-12px', overflow: 'scroll initial' }}
    >

      <div id={jitsiContainerId} style={{ width: "100%" }} />
    </div>

  )
}

export default withRouter(Jitsi);