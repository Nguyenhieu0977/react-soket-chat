import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { useFullScreen } from "react-browser-hooks";
import { setJitsiStore } from "./JitsiActions"
import Select from "react-select";
import ProgressComponent from '@material-ui/core/CircularProgress';
import axios from "axios";
// import { toastOnError } from "../../utils/Utils";
import UserList from "../chat/UserList";
import { getMeetRoom } from "./JitsiActions"
import Webcam from "react-webcam";
import JitsiControl from "./JitsiControl";

const JitsiMeetAdmin = () => {
    const { roomId } = useParams();
    const user_auth = useSelector((state) => state.auth);
    const roomMeet = useSelector(state => state.jitsi.meetroom)
    console.log(roomMeet)
    // const { jitsiState } = useSelector((state) => state.jitsi);
    console.log(user_auth)
    // console.log(jitsiState.stateAudio)

    // const [stateAudio, setStateAudio] = useState(false);
    // const [stateVideoAll, setStateVideoAll] = useState(false);
    const [user, setUser] = useState(user_auth.user.last_name + " " + user_auth.user.first_name);

    const fs = useFullScreen()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMeetRoom(roomId));
    }, [])
    console.log(roomId)



    const domain = 'meet.jit.si';
    let api = {};
    const [_api, setApi] = useState();
    const [room, setRoom] = useState("CNTTQK7");

    const [isAudioMuted, setIsAudioMuted] = useState();
    const [isVideoMuted, setIsVideoMuted] = useState();
    const [isTileView, setIsTileView] = useState(false);
    const [dominantSpeaker, setDominantSpeaker] = useState();
    const [meId, setMeId] = useState();
    const [jitsiUser, setJitsiUser] = useState();

    const [raiseHand, setRaiseHand] = useState();//{id:"", handRaised: false}
    const [raiseHandNew, setRaiseHandNew] = useState([]);//{id:"", handRaised: false}
    const [endpointTextMessageReceived, setEndpointTextMessageReceived] = useState();
    const [numberOfParticipants, setNumberOfParticipants] = useState();
    const [incomingMessage, setIncomingMessage] = useState();
    const incomingMessages = [];
    const [outgoingMessage, setOutgoingMessage] = useState();

    const [displayName2, setDisplayName2] = useState();
    const [displayName3, setDisplayName3] = useState();
    const [participants, setParticipants] = useState([]);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [stateAudioAll, setStateAudioAll] = useState(false);
    const [audio_Input, setAudio_Input] = useState();
    const [audio_Output, setAudio_Output] = useState();
    const [video_Input, setVideo_Input] = useState();
    const [webcamId, setWebcamId] = useState("");

    const [loading, setLoading] = useState(true);
    const history = useHistory();


    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const startMeet = () => {
        const options = {
            roomName: "cnttqk7",
            // password:password,
            width: '100%',
            height: "100%",
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                TILE_VIEW_MAX_COLUMNS: 4,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'hangup', 'fullscreen', 'tileview', 'desktop', 'raisehand', 'filmstrip', 'mute-video-everyone', 'select-background'],
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: { displayName: user, }
        }
        api = new window.JitsiMeetExternalAPI(domain, options);
        setApi(api)
        api.addEventListener('videoConferenceJoined', (object) => {
            setMeId(object.id)
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
            avatarChanged: handleAvatarChanged,
            raiseHandUpdated: handleRaiseHandUpdated,
            endpointTextMessageReceived: handleEndpointTextMessageReceived,
            incomingMessage: incomingMessageListener,
            outgoingMessage: outgoingMessageListener,
            contentSharingParticipantsChanged: handleContentSharingParticipantsChanged,
        });
        api.executeCommand('subject', roomMeet.Subject);
        // api.executeCommand('toggleTileView')

        // api.executeCommand('avatarUrl', 'assets/images/avatars/user.jpg');
        // api.getCurrentDevices().then(devices => {
        //     setCurrentDevices(devices)
        // });
        api.getAvailableDevices().then(devices => {
            setAvailableDevices(devices)
        });
        // dispatch(setJitsiStore(api));
    }

    const handleClose = () => {
        console.log("handleClose");
    }
    const handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        // setMe_Id(participant)
        const data = await getParticipants();
        return participant
    }
    const handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        // setMe_Id(participant)
        console.log(participant)
        const data = await getParticipants();
        setParticipants(data)
        const data2 = await getNumberOf();
        setNumberOfParticipants(data2)
    }


    const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        // const data = await getParticipants();
        setJitsiUser(participant)
    }
    console.log(jitsiUser?.id)
    const handleVideoConferenceLeft = () => {
        // console.log("handleVideoConferenceLeft");
        return history.push('/');
    }
    const handleMuteStatus = (muted) => {
        console.log("handleMuteStatus", muted); // { muted: true } 
        setIsAudioMuted(muted)
    }
    // console.log(isAudioMuted)
    const handleVideoStatus = (video) => {
        // console.log("handleVideoStatus", video); // { muted: true }
        setIsVideoMuted(video)
    }
    // console.log(isVideoMuted)
    const handleTileViewStatus = (tileview) => {
        console.log("handleTileViewStatus", tileview); // { muted: true }
        setIsTileView(tileview.enabled)
    }

    //Tao nut lenh dieu khien chung
    const handleMuteEveryone = () => {
        _api.executeCommand('muteEveryone');
        setStateAudioAll(!stateAudioAll);
    }
    const handleMuteEveryoneCamera = () => {
        _api.executeCommand('muteParticipantsVideo');//CHua duoc
    }
    // Tao nut lenh dieu khien cuc bo
    const handleToggleCameraMirror = () => {
        _api.executeCommand('toggleCameraMirror');
    }
    const handleToggleFilmStrip = () => {
        _api.executeCommand('toggleFilmStrip');
    }
    const handleLargeVideoParticipant = () => {
        _api.executeCommand('setLargeVideoParticipant', 'af8ef2ce');
    }
    //Các lenh chua duoc
    const handleSetVideoQuality = () => {
        _api.executeCommand('setVideoQuality', 720);//Chua duoc
    }
    const handleSendTones = () => {//Khong duoc
        _api.executeCommand('sendTones', {
            tones: '12345#',
            duration: 200,
            pause: 200
        });
    }
    const handlesStartShareVideo = () => {
        _api.executeCommand('startShareVideo', "assets/vdeos/videoqk7.mp4");//Chua duoc
    }
    const handlesStopShareVideo = () => {
        _api.executeCommand('stopShareVideo');//Chua duoc
    }
    // Nhan thong bao
    function incomingMessageListener(object) {
        incomingMessages.push(object)
        setIncomingMessage(incomingMessages)
    }
    // useEffect(() => {
    //     incomingMessages.push(incomingMessage)
    // }, [incomingMessage])
    function outgoingMessageListener(object) {
        setOutgoingMessage(object)
    }
    // console.log(incomingMessage)
    // console.log(availableDevices)
    //Gui thong bao chua duoc
    const handleEndpointTextMessageReceived = (message) => {
        console.log("handleEndpointTextMessageReceived", message); //Chua duoc
        setEndpointTextMessageReceived(message)
    }
    const handleContentSharingParticipantsChanged = (data) => {
        console.log("handleContentSharingParticipantsChanged", data); //Chua duoc
    }


    // console.log(endpointTextMessageReceived)
    const handleSendChatMessage = () => {
        // _api.executeCommand('sendEndpointTextMessage', '99eafe21', 'text'); //Khong duoc
        _api.executeCommand('sendChatMessage',
            {
                message: 'Hieu gui sao khong dc',
                to: '89e539fa',
                ignorePrivacy: false
            });
    }

    const handleRemoveEventListeners = () => {
        _api.removeEventListeners('incomingMessage');//chua duoc
    }
    const handleToggleCamera = () => {
        _api.executeCommand('toggleCamera');//chua duoc
    }
    const handleToggleVirtualBackgroundDialog = () => {
        _api.executeCommand('toggleVirtualBackgroundDialog');//chua duoc
    }


    useEffect(() => {
        if (window.JitsiMeetExternalAPI) {
            startMeet();

        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }, [])

    //Nhan va tao bang Thanh vien join
    const handleDominantSpeaker = (speaker) => {
        console.log("DominantSpeaker", speaker);
        setDominantSpeaker(speaker.id)
        const dispName = api.getDisplayName(speaker.id)
        setDisplayName2(dispName)
    }
    const handleAvatarChanged = (aV) => {
        console.log("handleAvatarChanged", aV);
        console.log(aV.id);
        const dispName = api.getDisplayName(aV.id)
        setDisplayName3(dispName)
    }
    const handleRaiseHandUpdated = (raise) => {
        setRaiseHand(raise)
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
    console.log(raiseHandNew)
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
    const audioInputs = availableDevices.audioInput?.map(au => {
        return { "value": au.deviceId, "label": au.label }
    })
    const videoInputs = availableDevices.videoInput?.map(v => {
        return { "value": v.deviceId, "label": v.label }
    })
    const audioOutputs = availableDevices.audioOutput?.map(v => {
        return { "value": v.deviceId, "label": v.label }
    })
    const handleAudioInput = (audio_Input) => {
        setAudio_Input(audio_Input)
        _api.setVideoInputDevice(audio_Input.lable, audio_Input.value);
        console.log(video_Input)
    }
    const handleVideoInput = (video_Input) => {
        setVideo_Input(video_Input)
        setWebcamId(video_Input.value)
        _api.setVideoInputDevice(video_Input.lable, video_Input.value);
        // console.log(audio_Input)
    }
    const handleAudioOutput = (audio_Output) => {
        setAudio_Output(audio_Output)
        _api.setVideoInputDevice(audio_Output.lable, audio_Output.value);
    }
    const videoConstraints = {
        deviceId: webcamId
    };

    return (
        <div style={{ marginLeft: "-10px" }}>
            {roomMeet &&
                <div className="row">
                    {loading && <ProgressComponent style={{ marginLeft: '45%', marginTop: '25%', width: "100px", height: "100px" }} />}

                    {/* { (user_auth.user.rules == "1" || user_auth.user.rules == "0") && ( */}
                    {/* <div style={{ display: 'flex', height: '100vh', marginRight: '0px', overflow: 'scroll initial' }} > */}
                    <div className="col-xs-12 col-sm-8"  >
                        <div className="row" style={{ display: 'flex', height: '70vh', marginRight: '0px', justifyContent: "center" }}>
                            {displayName2 && dominantSpeaker !== meId && <div style={{ position: 'fixed', marginTop: '61vh', fontSize: "18px", fontWeight: "bold", backgroundColor: "gray", color: "white" }}>&nbsp;{displayName2}&nbsp;</div>}
                            {displayName3 && dominantSpeaker === meId && <div style={{ position: 'fixed', marginTop: '61vh', fontSize: "18px", fontWeight: "bold", backgroundColor: "gray", color: "white" }}>&nbsp;{displayName3}&nbsp;</div>}
                            <div id="jitsi-iframe" style={jitsiContainerStyle} ></div>
                        </div>
                        <div className="row" style={{ display: (loading ? 'none' : 'block') }}>
                            <div className="col-xs-12 col-sm-8" >
                                <div class="widget-box">
                                    <div class="widget-header">
                                        <h4 class="widget-title"><i class="ace-icon fa fa-cog"></i>Điều khiển nội bộ</h4>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <div class="row">
                                                <div className="col-xs-12 col-sm-6" >
                                                    <span>Chọn nguồn âm thanh đầu vào</span>
                                                    <Select
                                                        value={audio_Input}
                                                        onChange={handleAudioInput}
                                                        options={audioInputs ? audioInputs : ""}
                                                        placeholder={"Chọn nguồn vào âm thanh"}
                                                    />
                                                    <span>Chọn nguồn vào hình ảnh</span>
                                                    <Select
                                                        value={video_Input}
                                                        onChange={handleVideoInput}
                                                        options={videoInputs ? videoInputs : ""}
                                                        placeholder={"Chọn nguồn vào hình ảnh"}
                                                    />
                                                    <span>Chọn đầu ra âm thanh</span>
                                                    <Select
                                                        value={audio_Output}
                                                        onChange={handleAudioOutput}
                                                        options={audioOutputs ? audioOutputs : ""}
                                                        placeholder={"Chọn đầu ra âm thanh"}
                                                    />
                                                </div>
                                                <div className="col-xs-12 col-sm-6" >
                                                    <div className="profile-user-info profile-user-info-striped">
                                                        <div className="profile-info-row">
                                                            <div className="profile-info-name">Tắt míc tất cả các thành viên </div>
                                                            <div className="profile-info-value">
                                                                <span>
                                                                    <button className=" btn-sm btn-white btn-round" type="button" onClick={handleMuteEveryone} title="Tắt míc tất cả các thành viên">
                                                                        <i className="ace-icon fa fa-microphone-slash red bigger-90" />
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-info-row">
                                                            <div className="profile-info-name">Tắt Camera tất cả các thành viên </div>
                                                            <div className="profile-info-value">
                                                                <span>
                                                                    <button className=" btn-sm btn-white btn-round" type="button" onClick={handleMuteEveryoneCamera} title="Tắt Camera tất cả các thành viên">
                                                                        <i className="ace-icon fa fa-camera red bigger-90" />
                                                                        &nbsp; Bật/Tắt
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-info-row">
                                                            <div className="profile-info-name">Đảo chiều Camera</div>
                                                            <div className="profile-info-value">
                                                                <span>
                                                                    <button className="btn-sm btn-white btn-round" type="button" onClick={handleToggleCameraMirror} title="Đảo chiều Camera">
                                                                        <i className="ace-icon fa fa-video-camera green bigger-90" />
                                                                        &nbsp;Bật
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="profile-info-row">
                                                            <div className="profile-info-name">Gửi thông báo</div>
                                                            <div className="profile-info-value">
                                                                <span>
                                                                    <button className="btn-sm btn-white btn-round" type="button" onClick={handleSendChatMessage} title="Gửi thông báo">
                                                                        <i className="ace-icon fa fa-video-camera green bigger-90" />
                                                                        &nbsp;Gửi
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
                            <div className="col-xs-12 col-sm-4" >
                                <div class="widget-box">
                                    <div class="widget-header">
                                        <h4 class="widget-title"><i class="ace-icon fa fa-cog"></i>Danh sách lịch hội nghị</h4>
                                    </div><div class="widget-body">
                                        <div class="widget-main">
                                            <div class="row">
                                                    <p>
                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleFilmStrip}>
                                                            <i className="ace-icon fa fa-film green bigger-120" />
                                                            &nbsp;Tắt mở hình ảnh thành viên
                                                        </button>
                                                    </p>
                                                    <p>
                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleRemoveEventListeners}>
                                                            <i className="ace-icon fa fa-comments-o green bigger-120" />
                                                            &nbsp;Tắt mở hình ảnh thành viên  &nbsp;
                                                        </button>
                                                    </p>
                                                    <p>
                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleCamera} title="Tắt/mở tất cả Camera thành viên">
                                                            <i className="ace-icon fa fa-file-movie-o green bigger-120" />
                                                            &nbsp;Tắt mở hình ảnh thành viên  &nbsp;
                                                        </button>
                                                    </p>
                                                    <p>
                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={handleToggleVirtualBackgroundDialog}>
                                                            <i className="ace-icon fa fa-file-movie-o green bigger-120" />
                                                            &nbsp;Tắt mở hình ảnh thành viên  &nbsp;
                                                        </button>
                                                    </p>
                                                    <p>
                                                        <button className="pull-center btn-sm btn-white btn-round" type="button" onClick={fs.toggle} title="Phóng to/thu nhỏ màn hình">
                                                            {!fs.fullScreen ? (<i className="ace-icon fa fa-arrows-alt green bigger-120" />) : (<i className="ace-icon fa fa-compress red bigger-120" />)}
                                                            &nbsp;Phóng to/thu nhỏ màn hình
                                                        </button>
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-4" style={{ display: (loading ? 'none' : 'block') }} >
                        <div class="widget-box">
                            <div class="widget-header">
                                <h4 class="widget-title"><i class="ace-icon fa fa-users"></i>Danh sách lịch hội nghị: Tổng số: {numberOfParticipants} thành viên</h4>
                            </div><div class="widget-body">
                                <div class="widget-main">
                                    <div class="row">
                                        <JitsiControl _api={_api} roomId={roomId} jitsiUser={jitsiUser} participants={participants} raiseHandNew={raiseHandNew} dominantSpeaker={dominantSpeaker} isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} />
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
    );
};

export default withRouter(JitsiMeetAdmin);
