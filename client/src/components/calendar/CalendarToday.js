import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe'
import moment from 'moment';
import CalendarJitsi from './CalendarJitsi';
import ControlList from './ControlList';

function CalendarToday(props) {
    const { index, cal } = props;
    const [status, setStatus] = useState("Chưa diễn ra")
    const [statusNum, setStatusNum] = useState(3)
    const [classType, setClassType] = useState("search-promotion label label-blue arrowed-in arrowed-in-right")

    useEffect(() => {
        var datenow = new Date()
        var date1 = new Date(cal.StartTime);
        var date2 = new Date(cal.EndTime);
        var date3 = date1 - datenow
        var date4 = date2 - datenow
        if (date4 <= 0) {
            setStatus("Đã kết thúc")
            setStatusNum(0)
            setClassType("search-promotion label label-danger arrowed-in arrowed-in-right")
        }
        if (date3 <= 0 && date4 >= 0) {
            setStatus("Đang diễn ra")
            setStatusNum(1)
            setClassType("search-promotion label label-success arrowed-in arrowed-in-right")
        }

    }, [props.calendar])
    return (
        <>
            {cal && statusNum === 1 ?
                <div className="col-xs-12 col-sm-12 col-md-12" key={index} style={{ padding: "1px" }}>
                    <div className="thumbnail search-thumbnail">
                        <span className={classType}><b>{status}</b></span>
                        {/* <iframe  src="https://meet.jit.si/Hieu" style={{height: "300px", width: "100%", border: "0px"}}></iframe> */}
                        {/* <Iframe url="https://meet.jit.si/Hieu"
                            width="100%"
                            height="300px"
                            // id="myId"
                            // className="myClassname"
                            display="initial"
                            position="relative"
                            allow="camera; microphone; fullscreen; display-capture; autoplay" 
                            /> */}
                        <CalendarJitsi id={cal.Id} Subject={cal.Subject} />
                        <ControlList />
                        <div className="caption">
                            <div className="clearfix">
                                <span className="pull-right label label-grey info-label">Địa điểm: {cal.Location}</span>

                            </div>
                            <h5 className="search-title">
                                <a href="#" className="blue">{cal.Subject}</a>
                            </h5>
                            {/* <p>{cal.Description}</p> */}
                            <span >Thời gian từ {moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span> &nbsp;
                            <span >đến {moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                        </div>
                    </div>
                </div>
                :
                <div className="col-xs-6 col-sm-6 col-md-6" key={index} style={{ padding: "1px" }}>
                    <div className="thumbnail search-thumbnail">
                        <span className={classType}><b>{status}</b></span>
                        <img className="media-object" alt="100%x200" style={{ height: 120, width: '100%', display: 'block' }} src="assets/images/myimg/HNTT.jpg" data-holder-rendered="true" />
                        {/* <iframe src="https://meet.jit.si/Hieu" style={{ height: "200px", width: "100%", border: "0px" }}></iframe> */}
                        <div className="caption">
                            <div className="clearfix">
                                <span className="pull-right label label-grey info-label">Địa điểm: {cal.Location}</span>

                            </div>
                            <h5 className="search-title">
                                <a href="#" className="blue">{cal.Subject}</a>
                            </h5>
                            {/* <p>{cal.Description}</p> */}
                            <span >Thời gian từ {moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span> &nbsp;
                            <span >đến {moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default CalendarToday
