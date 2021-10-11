import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAudio } from "../jitsi/JitsiActions"

import { useFullScreen } from "react-browser-hooks";

const ControlList = () => {

    const apiStore = useSelector((state) => state.jitsi);
    const jitsiState = useSelector((state) => state.jitsi);
    const api = apiStore.jitsiStrore;
    const [stateAudio, setStateAudio] = useState(jitsiState.stateAudio)
    const [stateCamera, setStateCamera] = useState(true)
    const [stateShare, setStateShare] = useState(true)
    const [stateChat, setStateChat] = useState(true)
    const [stateCameraMirror, setStateCameraMirror] = useState(true)
    const [stateTileView, setStateTileView] = useState(true)
    const [stateRaiseHand, setStateRaiseHand] = useState(true)
    const [stateFilmStrip, setStateFilmStrip] = useState(true)

    const [fullDesktop, setFullDesktop] = useState(false)
    const [numberOfParticipants, setNumberOfParticipants] = useState()
    const dispatch = useDispatch();

    const { toggle, fullScreen } = useFullScreen();
    const handleFullDesktop = () => {
        toggle();
        setFullDesktop(!fullDesktop);
    }
    const audioOneClick = () =>{
        api.executeCommand('toggleAudio');
        // api.executeCommand('toggleFilmStrip');//An hien khung anh doc
        // api.executeCommand('setLargeVideoParticipant', 'abcd1234');
        // api.executeCommand('setVideoQuality', 1080);
        // api.executeCommand('muteEveryone');
        // api.dispose();
        // api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
        // api.executeCommand('sendTones', {
        //     tones: '12345#', // The dial pad touch tones to play. For example, '12345#'.
        //     duration: 200, // Optional. The number of milliseconds each tone should play. The default is 200.
        //     pause: 200 // Optional. The number of milliseconds between each tone. The default is 200.
        // });
        setStateAudio(!stateAudio)
        dispatch(setAudio(!jitsiState.stateAudio))
        console.log(jitsiState.stateAudio)
    }
    const videoOneClick = () =>{
        api.executeCommand('toggleVideo');
        setStateCamera(!stateCamera)
    }
    const shareScreenClick = () =>{
        api.executeCommand('toggleShareScreen');
        setStateShare(!stateShare)
    }
    const chatClick = () =>{
        api.executeCommand('toggleChat');
        setStateChat(!stateChat)
    }
    const cameraMirrorClick = () =>{
        api.executeCommand('toggleCameraMirror');
        // room.setLocalParticipantProperty('raised-hand', true)
        setStateCameraMirror(!stateCameraMirror)
    }
    const tileViewClick = () =>{
        api.executeCommand('toggleTileView');
        setStateTileView(!stateTileView)
    }
    const filmStripClick = () =>{
        api.executeCommand('toggleFilmStrip');
        setStateFilmStrip(!stateFilmStrip)
    }



    
    const raiseHandClick = () =>{
        // const infoMy = api.getParticipantsInfo()
        // console.log(infoMy)
        // console.log(infoMy[0].participantId)
        // const numberOfParticipants = api.getNumberOfParticipants();
        // console.log(numberOfParticipants)
        // api.addEventListener(
        //     {
        //         id: infoMy[0].participantId,         
        //         handRaised: true // whether hand raised or lowered
        //     }
        //   );
        //   console.log(handleParticipantLeft())
        api.executeCommand('toggleRaiseHand');
          setStateRaiseHand(!stateRaiseHand)
    }

    
    return (
        <div className="navbar-buttons navbar-header " role="navigation" style={{ marginTop: '10px', textAlign: "center"}}>
            <div className="pull-right action-buttons">
                <button className="blue" onClick={audioOneClick} title="Tắt/Mở Micro">
                    {jitsiState.stateAudioAll ? (<i className="ace-icon fa fa-microphone green bigger-160" /> ) : (<i className="ace-icon fa fa-microphone-slash red bigger-160" /> )}
                </button>
                <span className="vbar" />
                <button className="blue" onClick={videoOneClick} title="Tắt/Mở Camera">
                    {stateCamera ? (<i className="ace-icon fa fa-video-camera green bigger-160" /> ) : (<i className="ace-icon fa fa-file-movie-o red bigger-160" /> )}
                </button>
                <button className="blue" onClick={shareScreenClick} title="Chia sẻ màn hình">
                    {stateShare ? (<i className="ace-icon fa fa-share-square-o green bigger-160" /> ) : (<i className="ace-icon fa fa-share-square red bigger-160" /> )}
                </button>

                <button className="blue" onClick={chatClick} title="Trao đổi thông tin">
                    {stateChat ? (<i className="ace-icon fa  fa-comments-o  green bigger-160" /> ) : (<i className="ace-icon fa fa-comments-o red bigger-160" /> )}

                </button>
                <button className="blue" onClick={raiseHandClick} title="Đăng ký phát biểu">
                    {stateRaiseHand ? (<i className="ace-icon fa fa-hand-paper-o  green bigger-160" /> ) : (<i className="ace-icon fa fa-hand-rock-o red bigger-160" /> )}
                </button>
                <button className="blue" onClick={tileViewClick} title="Thay đổi giao diện hình ảnh">
                    {stateTileView ? (<i className="ace-icon fa fa-th-large green bigger-160" /> ) : (<i className="ace-icon fa fa-desktop red bigger-160" /> )}

                </button>
                <button className="blue" onClick={handleFullDesktop} title="Phóng to/Thu nhỏ màn hình">
                    {/* <i className="ace-icon fa fa-external-link-square fa fa-film green bigger-160" /> */}
                    {!fullDesktop ? (<i className="ace-icon fa fa-arrows-alt green bigger-160" />) : (<i className="ace-icon fa fa-compress red bigger-160" />)}

                </button>
                <button className="blue" onClick={cameraMirrorClick} title="Lật hình ảnh Camera">
                    {stateCameraMirror ? (<i className="ace-icon fa fa-exchange  green bigger-160" /> ) : (<i className="ace-icon fa fa-file-image-o red bigger-160" /> )}

                </button>
                <button className="blue" onClick={filmStripClick} title="Hiển thị/Tắt hiển thị hình ảnh các thành viên">
                    {stateFilmStrip ? (<i className="ace-icon fa fa-film  green bigger-160" /> ) : (<i className="ace-icon fa fa-film red bigger-160" /> )}

                </button>
                {(numberOfParticipants)&&(
                    <button className="blue" title="Hiển thị/Tắt hiển thị hình ảnh các thành viên">
                    <i className="ace-icon fa fa-group green bigger-160" /> 
                    
                    &nbsp;&nbsp; {numberOfParticipants}
                </button>
                )}
                



            </div>
            {/* <button href="/"><span className="badge badge-important">Trang chủ</span></button>
                  <span className="badge badge-important"><a className="dropdown-toggle" href="/"></a>Trang chủ</span> */}
        </div>
    )
};

export default ControlList;
