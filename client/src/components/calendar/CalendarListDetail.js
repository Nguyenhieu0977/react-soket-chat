import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { Link } from 'react-router-dom'
import moment from 'moment';
import CalendarModal from './CalendarModal';

function CalendarListDetail(props) {
    const {className, handleEditCalendar, pageVisited, index, calendar, profiles } = props
    const { Id, Subject, Location, StartTime, EndTime, Description, EventType, User_room, User_vip } = props.calendar
    // const [isActive2, setIsActive2] = useState(false)
    // console.log(props.calendar)

    const eventType = (EventType) => {
        switch (EventType) {
            case 0:
                return "Ưu tiên Cao"
            case 1:
                return "Ưu tiên Trung bình"
            case 2:
                return "Ưu tiên Thấp"
            default:
                break;
        }
    }

    const handleToggle = () => {
        handleEditCalendar(Id, calendar)
    }

    const videoConstraints = {
        width: 200,
        height: 160,
        facingMode: "user"
    };
    // const webcamRef = useRef(null);
    // const capture = React.useCallback(
    //     () => {
    //         const imageSrc = webcamRef.current.getScreenshot();
    //     },
    //     [webcamRef]
    // );


    return (

        <tr className={className === 'active' ? `detail-row open {}` : "detail-row"} key={index}  >
            <td colSpan={6}>
                <div className="row">
                    <div className="col-xs-12 col-sm-3">

                        <div className="text-center">
                            <>
                                {/* <Webcam
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                /> */}
                                {/* <button onClick={capture}>Capture photo</button> */}
                            </>
                            {/* <CalendarModal /> */}
                            <img height={170} className="thumbnail inline no-margin-bottom" alt="Domain Owner's Avatar" src="assets\images\myimg\HNTT.jpg" />
                            {/* <br />
                            <div className="width-80 label label-info label-xlg arrowed-in arrowed-in-right">
                                <div className="inline position-relative">
                                    <a className="user-title-label" href="#">
                                        <i className="ace-icon fa fa-circle light-green" />
                                        &nbsp;
                                        <span className="white">Nguyễn Khắc Hiếu</span>
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-7">
                        <div className="profile-user-info profile-user-info-striped">
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}>Tiêu đề hội nghị </div>
                                <div className="profile-info-value">
                                    <span>{Subject}</span>
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}> Địa điểm </div>
                                <div className="profile-info-value">
                                    <span> {Location}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}> Thời gian bắt đầu </div>
                                <div className="profile-info-value">
                                    <span>{moment(StartTime).format("hh:mm A - DD/MM/YY").toString()}</span>
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <div className="profile-info-name"> Thời gian kết thúc </div>
                                <div className="profile-info-value">
                                    <span>{moment(EndTime).format("hh:mm A - DD/MM/YY").toString()}</span>
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <div className="profile-info-name"> Chủ trì hội nghị: </div>
                                <div className="profile-info-value">
                                {profiles?.filter(p => User_vip.includes(p.user)).map(v => { return <span style={{color:"blue"}}>{v.first_name}&nbsp; </span> })}
                                </div>
                            </div>
                            
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}> Mô tả cuộc hội nghị </div>
                                <div className="profile-info-value">
                                    <span> {Description}</span>
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}> Mức độ ưu tiên </div>
                                <div className="profile-info-value">
                                    <span>{eventType(EventType)}</span>
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '150px' }}> Tổng số thành viên </div>
                                <div className="profile-info-value">
                                    {(() => {
                                        switch (String(User_room.length).length) {
                                            case 1: return <span>0{User_room.length}</span>;
                                            default: return <span>{User_room.length}</span>;
                                        }
                                    })()}
                                    
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-2">
                        <div className="clearfix">
                            <button className="pull-right btn-sm btn-white btn-round" type="button" onClick={handleToggle}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Xem danh sách&nbsp;
                                &nbsp;<i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" />
                            </button>
                        </div>

                        <div className="hr hr-dotted" />
                        <div className="clearfix">
                            <button className="pull-right btn-sm btn-white btn-round">
                                <Link to={`/hnth-client/${Id}`} target="_blank">
                                    &nbsp;Tham gia hội nghị&nbsp;
                                    &nbsp;<i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" />
                                </Link>
                            </button>
                        </div>
                        <div className="hr hr-dotted" />
                        <div className="clearfix">
                            <button className="pull-right btn-sm btn-white btn-round">
                                <Link to={`/hnth-admin/${Id}`} target="_blank">
                                    Điều khiển hội nghị&nbsp;
                                    <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" />
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default CalendarListDetail;
