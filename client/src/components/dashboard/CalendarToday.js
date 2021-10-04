import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CalendarJitsi from './CalendarJitsi';
import { Link } from 'react-router-dom';

function CalendarToday(props) {
    const { cal, profiles, profile } = props;
    const [status, setStatus] = useState("Chưa diễn ra")
    const [statusNum, setStatusNum] = useState(3)
    const [classType, setClassType] = useState("search-promotion label label-blue arrowed-in arrowed-in-right")

    const eventType = (EventType) => {
        switch (EventType) {
            case 0:
                return "Cao"
            case 1:
                return "Trung bình"
            case 2:
                return "Thấp"
            default:
                break;
        }
    }
    useEffect(() => {
        var datenow = new Date()
        var date1 = new Date(cal.StartTime);
        var date2 = new Date(cal.EndTime);
        var date3 = date1 - datenow
        var date4 = date2 - datenow
        // console.log(datenow.getTime())
        if (date4 <= 0) {
            setStatus("Đã kết thúc")
            setStatusNum(0)
            setClassType("search-promotion label label-danger arrowed-in arrowed-in-right")
        }
        if (date3 <= 0 && date4 >= 0) {
            // if (date3 <= 0 && date4 >= 0 && moment(cal.StartTime).format("hh:mm A").toString() <= moment(datenow).format("hh:mm A").toString() && moment(cal.EndTime).format("hh:mm A").toString() >= moment(datenow).format("hh:mm A").toString()) {
            setStatus("Đang diễn ra")
            setStatusNum(1)
            setClassType("search-promotion label label-success arrowed-in arrowed-in-right")
        }

    }, [])

    return (
        <div className="col-xs-12 col-sm-6" style={{ paddingLeft: "0px", paddingRight: "0px" }} key={cal.Id}>
            <div className="row"  >
                <div className="col-xs-12 col-sm-4" >
                    <div className="text-center">
                        <span className={classType}><b>{status}</b></span>
                        <img style={{ maxWidth: '120%' }} className="thumbnail inline no-margin-bottom" alt="Anh Hoi nghi" src="assets\images\meet\meeting2.jpg" />
                        <div className="hr hr-dotted hr-6"></div>
                        {status === "Đang diễn ra" ?
                            <Link to={`/hnth-client/${cal.Id}`} target="_blank">
                                <button className=" btn-primary " title="Click để tham gia cuộc họp">
                                    &nbsp; Tham gia cuộc họp&nbsp;
                                    <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                                </button>
                            </Link>
                            :
                            <button disabled title="Cuộc họp đã kết thúc hoặc chưa diễn ra">
                                &nbsp; Tham gia cuộc họp&nbsp;
                                <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                            </button>
                        }
                        <div className="hr hr-dotted hr-6"></div>
                        {/* cal.User_control.find(profile.user) */}
                        {cal.User_control.find((uR) => uR === profile.user) &&
                            <Link to={`/hnth-admin/${cal.Id}`} target="_blank">
                                <button title="Click để điều khiển cuộc họp">
                                    &nbsp;Điều khiển hội nghị&nbsp;
                                    <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" />
                                </button>
                            </Link>
                        }
                    </div>
                </div>
                <div className="col-xs-12 col-sm-8" >
                    <div className="profile-user-info profile-user-info-striped" style={{ display: 'block' }}>
                        <div className="profile-info-row" style={{ display: 'block' }}>
                            <div className="profile-info-value" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }} title={cal.Subject}>
                                <i className="ace-icon fa fa-laptop bigger-110"></i> &nbsp;
                                <b  >{cal.Subject}</b>
                            </div>
                        </div>
                        <div className="profile-info-row">
                            <div className="profile-info-value" style={{ color: "green" }}>
                                <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                                Bắt đầu:	{moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}
                            </div>
                        </div>
                        <div className="profile-info-row">
                            <div className="profile-info-value" style={{ color: "grey" }} >
                                <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                                Kết thúc:	{moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}
                            </div>
                        </div>
                        <div className="profile-info-row">
                            <div className="profile-info-value" style={{ color: "grey" }} >
                                <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                                Chủ trì: {profiles.filter(p => cal.User_vip.includes(p.user)).map(v => { return <span style={{ color: "blue" }}>{v.first_name}&nbsp; </span> })}
                            </div>
                        </div>
                        <div className="profile-info-row">
                            <div className="profile-info-value"  >
                                <i className="ace-icon fa fa-heart-o bigger-110"></i> &nbsp;
                                Mức độ ưu tiên:	{eventType(cal.EventType)}
                            </div>
                        </div>
                        <div className="profile-info-row">
                            <div className="profile-info-value"  >
                                <i className="ace-icon fa fa-eye bigger-110"></i> &nbsp;
                                Số thành viên: &nbsp;
                                {(() => {
                                    switch (String(cal.User_room.length).length) {
                                        case 1: return <span>0{cal.User_room.length}</span>;
                                        default: return <span>{cal.User_room.length}</span>;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hr hr-dotted hr-6"></div>
        </div>
    )
}

export default CalendarToday
