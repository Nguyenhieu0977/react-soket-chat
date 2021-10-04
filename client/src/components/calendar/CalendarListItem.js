import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailCalendar } from "./CalendarActions";
import CalendarListDetail from './CalendarListDetail';
import moment from 'moment';

function CalendarListItem(props) {
    const [isActive, setActive] = useState(false);
    const [isActive2, setActive2] = useState(false)
    // const [activeIndex, setActiveIndex] = useState(0);
    const [status, setStatus] = useState("Chưa diễn ra")
    const [classType, setClassType] = useState("blue")

    const { Id, Subject, StartTime, EndTime } = props.calendar
    const {setIsSelected, className, index, idSelected, pageVisited, handleEditCalendar, handleDelCalendar, calendar, profiles } = props
    // const data = useSelector((state) => state.calendars.calendars);
    // const timeNow = new Date().getMilliseconds();
    // const timeStart = new Date(StartTime).getMilliseconds();
    // const timeEnd = new Date(EndTime).getMilliseconds();


    useEffect(() => {
        var datenow = new Date()
        var date1 = new Date(StartTime);
        var date2 = new Date(EndTime);
        var date3 = date1 - datenow
        var date4 = date2 - datenow
        if (date4 <= 0) {
            setStatus("Đã kết thúc")
            setClassType("orange")
        }
        if (date3 <= 0 && date4 >= 0) {
            setStatus("Đang diễn ra")
            setClassType("green bolder")
        }

    }, [calendar])

    const dispatch = useDispatch();
    // console.log(idSelected)
    const handleToggle = () => {
        props.setActiveIndex(index)
        props.setIsSelected(false)
        // handleEditCalendar(Id, calendar)
    }

    // useEffect(() => {
    //     if (index === 0) {
    //         setActive2(!isActive2)
    //         setActive(!isActive)
    //     }
    // },[])


    // const handleEditCal = () =>{
    //     // let data = {"id":1, "title":"HHHHHH"}
    //     handleEditCalendar(Id, props.calendar)
    // }
    const handleDelCal = () => {
        handleDelCalendar(Id)
    }
    return (

        <>
            <tr key={index}>
                <td >
                    {index + pageVisited + 1}
                </td>
                <td >
                    <span >{Subject}</span>
                </td>
                <td >
                    <span >{moment(StartTime).format("hh:mm A - DD/MM/YYYY").toString()}</span>
                </td>
                <td >
                    <span>{moment(EndTime).format("hh:mm A - DD/MM/YYYY").toString()} </span>
                </td>

                <td className="hidden-480">
                    <span className={classType}>{status}</span>
                </td>
                <td>
                    <div className="hidden-sm hidden-xs ">
                        <button className={className === 'active' ? 'btn-xs btn-success' : 'btn-xs'} >
                            <i className={className === 'active' ? 'ace-icon bigger-120 fa fa-eye' : 'ace-icon bigger-120 fa fa-eye-slash'} onClick={() => handleToggle(index)} title="Xem chi tiết" />
                        </button>
                        <button className='btn-xs btn-btn-info' >
                            <Link to={`/cal_edit/${Id}`}>
                                <i className="ace-icon fa fa-pencil bigger-120" />
                            </Link>
                        </button>
                        <button className="btn-xs btn-danger">
                            <i className="ace-icon fa fa-trash-o bigger-120" onClick={handleDelCal} />
                        </button>
                        {/* <button className="btn-xs btn-warning">
                            <i className="ace-icon fa fa-flag bigger-120" />
                        </button> */}
                    </div>

                </td>
            </tr>
            {Id ? <CalendarListDetail className ={className} calendar={calendar} profiles={profiles} idSelected={idSelected} isActive={isActive} isActive2={isActive2} pageVisited={pageVisited} index={index} handleEditCalendar={handleEditCalendar} /> : ""}
        </>
    )
}

export default CalendarListItem

