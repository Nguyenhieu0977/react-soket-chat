import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function CalendarNext(props) {
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

    }, [])

    return (
        <>
            {cal && index===0 || index===1 ?
                <div className="col-xs-12 col-sm-12 col-md-12" key={index} style={{ height: "35vh" }}>
                    <div className="thumbnail search-thumbnail">
                        <span className={classType}><b>{status}</b></span>
                        <img className="media-object" alt="100%x200" style={{ minHeight: "15vh", width: '100%', display: 'block' }} src="assets/images/myimg/HNTT.jpg" data-holder-rendered="true" />
                        <div className="caption">
                          
                            <Link to={`/hnth/${cal.Id}`} >
                            <h5 className="search-title">
                                {cal.Subject}
                            </h5>
                            </Link>
                            <span >Thời gian từ {moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span> &nbsp;
                            <span >đến {moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                        </div>
                    </div>
                </div>

            : <div className="col-xs-12 col-sm-12 col-md-12" key={index} style={{ height: "23vh" }}>
            <div className="thumbnail search-thumbnail">
                <div className="caption">
                    <Link to={`/hnth/${cal.Id}`} >
                    <h5 >
                        Nội dung: {cal.Subject}
                    </h5>
                    </Link>
                    <p>{cal.Description}</p>
                    <span >Thời gian từ {moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span> &nbsp;
                    <span >đến {moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                </div>
            </div>
        </div>}
        </>
    )
}

export default CalendarNext
