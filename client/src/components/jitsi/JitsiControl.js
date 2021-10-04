import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getUsers, getProfiles } from '../users/UserActions';
import axios from "axios";
import { withRouter, useHistory, useParams } from "react-router-dom";

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const JITSI_AUDIO_ONE = "JITSI_AUDIO_ONE";
const SVR_JITSI_AUDIO_ONE = "SVR_JITSI_AUDIO_ONE";
const JITSI_VIDEO_ONE = "JITSI_VIDEO_ONE";
const SVR_JITSI_VIDEO_ONE = "SVR_JITSI_VIDEO_ONE";
const JITSI_FILMSTRIP = "JITSI_FILMSTRIP";
const SVR_JITSI_FILMSTRIP = "SVR_JITSI_FILMSTRIP";
const JITSI_TOGGLE_VIEW = "JITSI_TOGGLE_VIEW";
const SVR_JITSI_TOGGLE_VIEW = "SVR_JITSI_TOGGLE_VIEW";

const SOCKET_SERVER_URL = "http://localhost:4000";

function JitsiControl(props) {
    const { _api, roomId, jitsiUser, participants, raiseHandNew, dominantSpeaker, isAudioMuted, isVideoMuted, List_user_room, idLeave, isTileView, isFilmstrip, handleToggleTileView, handleToggleFilmStrip } = props
    // const { roomId } = useParams();
    const user_auth = useSelector((state) => state.auth.user);
    const dataUser = useSelector(state => state.users.data);
    const profiles = useSelector(state => state.profiles.data);
    const profile = useSelector(state => state.profile.data);
    const fullname = profile.first_name

    const [users, setUsers] = useState([]);
    const socketRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getProfiles())
    }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await axios.get(
    //             `${SOCKET_SERVER_URL}/rooms/${roomId}/users`
    //         );
    //         const result = response.data.users;
    //         setUsers(result);
    //     };

    //     fetchUsers();
    // }, [roomId]);

    useEffect(() => {
        if (!fullname || !jitsiUser?.id) {
            return;
        }
        // socketRef.current = socketIOClient(SOCKET_SERVER_URL);

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, userId: user_auth.id, fullname, jitsiUserId: jitsiUser?.id, isAudioMuted: isAudioMuted.muted, isVideoMuted: isVideoMuted.muted },
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
            console.log(id)
            // const index = participants.findIndex(p=>p.participantId===id)
            // if(index !==-1) 
            _api.executeCommand('toggleAudio');
        });
        socketRef.current.on(SVR_JITSI_VIDEO_ONE, (id) => {
            // console.log(id)
            _api.executeCommand('toggleVideo');
        });

        socketRef.current.on(SVR_JITSI_FILMSTRIP, (data) => {
            _api.executeCommand('toggleFilmStrip');
        });


        socketRef.current.on(SVR_JITSI_TOGGLE_VIEW, () => {
            _api.executeCommand('toggleTileView');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, jitsiUser, isAudioMuted, isVideoMuted]);
    // console.log(raiseHandNew)
    // useEffect(() => {
    //         if (!socketRef.current) return;
    //         socketRef.current.emit(JITSI_FILMSTRIP, isFilmstrip)
    //         if (!socketRef.current) return;
    //         socketRef.current.emit(JITSI_TOGGLE_VIEW)
    // }, [isFilmstrip, isTileView])
    useEffect(() => {
        if (handleToggleFilmStrip) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_FILMSTRIP,
                roomId
            );
        }
    }, [handleToggleFilmStrip])
    useEffect(() => {
        if (handleToggleTileView) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_TOGGLE_VIEW,
                roomId
            );
        }

    }, [handleToggleTileView])

    const audioClick = (id) => {
        console.log(users)
        console.log(id)
        if (audioClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_AUDIO_ONE,
                // idSocket: socketRef.current.id,
                id
            );
            // console.log(socketRef.current.id)
        }
    }
    const videoClick = (id) => {
        console.log(id)
        if (videoClick) {
            if (!socketRef.current) return;
            socketRef.current.emit(JITSI_VIDEO_ONE,
                id
            );
        }
    }



    const participantView = participants.map((p, index) => {
        if (p.participantId !== idLeave?.id)
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ color: "green", fontWeight: "bold" }}>{p.displayName}</td>
                    {/* <td>{p.participantId}</td> */}
                    <td>
                        {raiseHandNew?.find((rH) => rH?.id === p.participantId)?.handRaised ? <i className="ace-icon fa fa-hand-paper-o  green bigger-120" /> : ""}
                        &nbsp;{p.participantId === dominantSpeaker ? (<i className="ace-icon fa fa-volume-up green bigger-120" />) : ""}
                    </td>
                    {/* {raiseHand?.find((rH)=> rH.id === p.participantId)?.handRaised} */}
                    <td>
                        <span className="vbar" />
                        <button className="blue" onClick={() => audioClick(p.participantId)}>
                            {users?.find((u) => u?.jitsiUserId === p.participantId)?.isAudioMuted !== 'true' ? (<i className="ace-icon fa fa-microphone green" />) : (<i className="ace-icon fa fa-microphone-slash red" />)}
                            {/* {users.find((u)=>u.jitsiUserId===p.participantId)?.userId} */}
                        </button>
                        <span className="vbar" />
                        <button className="blue" onClick={() => videoClick(p.participantId)}>
                            {users?.find((u) => u?.jitsiUserId === p.participantId)?.isVideoMuted !== 'true' ? (<i className="ace-icon fa fa-video-camera green" />) : (<i className="ace-icon fa fa-video-camera red" />)}
                        </button>
                    </td>
                </tr>
            )
    });
    const ps = participants.map(p => {
        if (p.participantId !== idLeave?.id)
            return p?.displayName
    })

    const List_user_room_filter = List_user_room.filter(items => !ps?.includes(items.last_name + " " + items.first_name)).map((item, index) => {
        return (
            <tr key={index} >
                <td >
                    {index + ps?.length + 1}
                </td>
                <td >
                {profiles.find(p => p.user === item.id).first_name ? profiles.find(p => p.user === item.id).first_name : item.username}
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
            <div className="control-group">
                <div className="dataTables_wrapper form-inline no-footer">
                    <table id="simple-table" className="table  table-bordered table-hover">
                        <thead>
                            <tr>
                                <th >TT</th>
                                <th >Tên thành viên</th>
                                <th >Phát biểu</th>
                                <th >Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participantView}

                            {List_user_room_filter}
                            {participantView}
                            {List_user_room_filter}
                            {List_user_room_filter}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default JitsiControl
