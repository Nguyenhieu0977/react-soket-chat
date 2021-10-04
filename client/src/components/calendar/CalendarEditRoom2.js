import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect, Link, useParams } from "react-router-dom";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import CalendarBreadcrumb from "./CalendarBreadcrumb";
import CalendarSeclectUserEdit from './CalendarSeclectUserEdit'
import { getUsers } from '../users/UserActions'
import { updateCalendar, detailCalendar, getCalendar } from './CalendarActions'
import Select from "react-select";


function CalendarEditRoom() {
    const { Id } = useParams();

    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [Description, setDescription] = useState();
    const [User_rooms, setUser_rooms] = useState();
    const [userEdit, setUserEdit] = useState();

    const [userAdd, setUserAdd] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const data = useSelector(state => state.users.data);
    // const responseting = useSelector(state => state.users.responseting);
    const messege = useSelector(state => state.users.messege);
    const success = useSelector(state => state.users.success);
    const dispatch = useDispatch();

    const dataRoom = useSelector(state => state.calendars.calendars);

    const eventType2 = [
        { value: 0, label: "Ưu tiên cao" },
        { value: 1, label: "Ưu tiên trung bình" },
        { value: 2, label: "Ưu tiên thấp" }
    ]

    useEffect(() => {
        dataRoom.map(items => items.Id === Id).map(x => {
            console.log(x.Subject)
            const EventType1 = eventType2.filter(items => {
                if (items.value === x.EventType) {
                    return { value: items.value, label: items.label }
                }
            })
            
            // const userEdit2 = data.filter(items => items.id in x.User_room).map(item => {
            //     return { "value": item.id, "label": item.last_name + " " + item.first_name };
            // })
            
            setSubject(x.Subject)
            setEventTypes(EventType1)
            setStartTime(x.StartTime)
            setEndTime(x.EndTime)
            setLocation(x.Location)
            setDescription(x.Description)
            // setUserEdit(userEdit2)
    
            // setUpdateData(true)
        })
    }, [])


    console.log(Subject)
    console.log(EventTypes)


    useEffect(() => {
        dispatch(getUsers())
        dispatch(getCalendar())
    }, [])

    const user_list = data.map(x => {
        return ({ "value": x.id, "label": x.last_name + " " + x.first_name })
    })
    const handleChangePro = (EventTypes) => {
        setEventTypes(EventTypes)
    }
    const handleUserSelect = (values) => {
        setUserAdd(values)
    }

    const updateCalendarForm = () => {
        // event.preventDefault();
        var User_room = Array.isArray(userAdd) ? userAdd.map(x => x.value) : []
        // console.log(User_room)
        var EventType = EventTypes.value
        let calendarUpdate = {
            Subject, EventType, StartTime, EndTime, Location, Description, User_room
        }
        if (calendarUpdate) {
            // console.log(Id)
            // console.log(calendarUpdate)
            dispatch(updateCalendar(Id, calendarUpdate));
            setUpdateSuccess(true)
            // Redirect("/cal_meet")
        }
    }

    return (
        <>
            <CalendarBreadcrumb />
            <div className="page-content">
                {success && updateData ?
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <div className="widget-box">
                                <div className="widget-header">
                                    <h4 className="widget-title">Chỉnh sửa phòng họp - {Id}</h4>
                                </div>
                                <div className="widget-body">
                                    <div className="widget-main">
                                        <div className="row">

                                            {/* <form > */}
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="col-sm-12">
                                                    <span className="bigger-110">Tiêu đề cuộc họp</span>
                                                    <input id="Summary" className="e-field e-input" type="text" name="Subject" value={Subject} style={{ width: '100%' }} onChange={e => setSubject(e.target.value)} />
                                                </div>
                                                <hr />

                                                <div className="col-sm-12">
                                                    <span className="bigger-110">Thời gian bắt đầu</span>
                                                    <DateTimePickerComponent id="StartTime" format='dd/MM/yyyy hh:mm a' data-name="StartTime" className="e-field" value={StartTime} onChange={e => setStartTime(e.target.value)}></DateTimePickerComponent>
                                                </div>
                                                <hr />
                                                <div className="col-sm-12">
                                                    <span className="bigger-110">Thời gian kết thúc</span>
                                                    <DateTimePickerComponent id="StartTime" format='dd/MM/yyyy hh:mm a' data-name="EndTime" className="e-field" value={EndTime} onChange={e => setEndTime(e.target.value)} ></DateTimePickerComponent>
                                                </div>
                                                <hr />
                                                <div className="col-sm-12">
                                                    <span className="bigger-110">Địa điểm</span>
                                                    <input id="Location" className="e-field e-input" type="text" name="Location" style={{ width: '100%' }} value={Location} onChange={e => setLocation(e.target.value)} />
                                                </div>

                                                <hr />
                                                <div className="col-sm-7">
                                                    <span className="bigger-110">Mức độc ưu tiên</span>

                                                    <Select
                                                        value={EventTypes}
                                                        onChange={handleChangePro}
                                                        options={eventType2}
                                                        placeholder={"Chọn mức độ mưu tiên"}
                                                    />


                                                </div>
                                                <hr />
                                                <div className="col-sm-12">
                                                    <span className="bigger-110">Mô tả cuộc họp</span>
                                                    <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} value={Description} onChange={e => setDescription(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6">
                                                {success && userEdit

                                                    ? <CalendarSeclectUserEdit user_list={user_list} handleUserSelect={handleUserSelect} userEdit={userEdit} />
                                                    : <ProgressComponent />
                                                }
                                            </div>


                                            <div className="col-sm-6 wizard-actions">
                                                <button type="submit" className="btn btn-sm btn-success" onClick={updateCalendarForm}>
                                                    Cập nhật
                                                    {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                </button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Link className="btn btn-sm btn-success" to="/cal_meet" >
                                                    Trở về danh sách phòng họp
                                                    {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                </Link>
                                            </div>
                                            {/* </form> */}
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                    : " "}
            </div>
        </>
    );
}

export default withRouter(CalendarEditRoom);