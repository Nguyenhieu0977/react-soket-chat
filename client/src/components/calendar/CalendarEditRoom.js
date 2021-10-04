import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect, Link, useParams, useHistory } from "react-router-dom";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Multiselect from 'multiselect-react-dropdown';
import CalendarSeclectUserEdit from './CalendarSeclectUserEdit'
import { getUsers, getProfiles } from '../users/UserActions'
import { updateCalendar, detailCalendar, getCalendar } from './CalendarActions'
import Select from "react-select";
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"

function CalendarEditRoom() {
    const { Id } = useParams();
    const history = useHistory();

    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [Description, setDescription] = useState();
    const [User_rooms, setUser_rooms] = useState();
    const [user_control, setUser_control] = useState();
    const [user_vip, setUser_vip] = useState();
    const [userEdit, setUserEdit] = useState();

    const [userAdd, setUserAdd] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const dataRoom2 = useSelector(state => state.calendars.calendarId);
    const dataRooms = useSelector(state => state.calendars.calendars)
    const profiles = useSelector(state => state.profiles.data);
    const dataRoom = dataRooms.filter((item) => item.Id === Id)[0]

    const data = useSelector(state => state.users.data);
    // const responseting = useSelector(state => state.users.responseting);
    // const messege = useSelector(state => state.users.messege);
    const user_list = data.map(item => {
        const label = profiles.find(p => p.user === item.id)?.first_name ? profiles.find(p => p.user === item.id)?.first_name : item.username
        return ({ "value": item.id, "label": label })
    })
    // const user_Control = data?.map(u => {
    //     const label = profiles?.find(p => p.user === u.id)?.first_name ? profiles.find(p => p.user === u.id)?.first_name : u.username
    //     return { id: u.id, label: label }
    // })
    const eventType2 = [
        { value: 0, label: "Ưu tiên cao" },
        { value: 1, label: "Ưu tiên trung bình" },
        { value: 2, label: "Ưu tiên thấp" }
    ]

    const success = useSelector(state => state.users.success);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(detailCalendar(Id))
        dispatch(getProfiles())
    }, [])

    useEffect(() => {
        if (dataRoom) {
            setSubject(dataRoom.Subject)
            setStartTime(dataRoom.StartTime)
            setEndTime(dataRoom.EndTime)
            setLocation(dataRoom.Location)
            setDescription(dataRoom.Description)

            const EventType1 = eventType2.filter(items => {
                if (items.value === dataRoom.EventType) {
                    return { value: items.value, label: items.label }
                }
            })
            setEventTypes(EventType1)

            const userEdit2 = data.filter(items => dataRoom.User_room.includes(items.id)).map(item => {
                const label = profiles.find(p => p.user === item.id)?.first_name ? profiles.find(p => p.user === item.id)?.first_name : item.username
                return { value: item.id, label: label };
            })
            setUserEdit(userEdit2)

            const userCtrEdit2 = data.filter(items => dataRoom.User_control.includes(items.id)).map(item => {
                const label = profiles.find(p => p.user === item.id)?.first_name ? profiles.find(p => p.user === item.id)?.first_name : item.username
                return { value: item.id, label: label };
            })
            setUser_control(userCtrEdit2)

            const userVipEdit2 = data.filter(items => dataRoom.User_vip.includes(items.id)).map(item => {
                const label = profiles.find(p => p.user === item.id)?.first_name ? profiles.find(p => p.user === item.id)?.first_name : item.username
                return { value: item.id, label: label };
            })
            setUser_vip(userVipEdit2)

            setUpdateData(true)
        }
    }, [])

    const handleChangePro = (EventTypes) => {
        setEventTypes(EventTypes)
    }
    const setUsercontrol = () =>{
        setUser_control()
    }
    const selectUserControl = (selectedList, selectedItem) =>{
        setUser_control(selectedList)
    }
    const setUservip = () =>{
        setUser_vip()
    }
    
    const selectUserVip = (selectedList, selectedItem2) =>{
        setUser_vip(selectedList)
    }
    
    const handleUserSelect = (values) => {
        setUserEdit(values)
    }

    const updateCalendarForm = () => {
        // event.preventDefault();
        var User_room = Array.isArray(userEdit) ? userEdit.map(x => x.value) : []
        var User_control = Array.isArray(user_control) ? user_control.map(x => x.value) : []
        var User_vip = Array.isArray(user_vip) ? user_vip.map(x => x.value) : []
        // console.log(User_room)
        var EventType = EventTypes.value
        let calendarUpdate = {
            Subject, EventType, StartTime, EndTime, Location, Description, User_room, User_control, User_vip
        }
        if (calendarUpdate) {
            dispatch(updateCalendar(Id, calendarUpdate));
            setUpdateSuccess(true)
            // Redirect("/cal_meet")
        }
        history.push(`/cal_edit/${Id}`);
    }


    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* <CalendarBreadcrumb /> */}
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
                                                        <div className="col-xs-12 col-sm-6">
                                                            <div className="col-sm-12">
                                                                <span className="bigger-110">Tiêu đề cuộc họp</span>
                                                                <input id="Summary" className="e-field e-input" type="text" name="Subject" value={Subject} style={{ width: '100%' }} onChange={e => setSubject(e.target.value)} />
                                                            </div>
                                                            <hr />
                                                            <div className="col-sm-12">
                                                                <span className="bigger-110">Mô tả cuộc họp</span>
                                                                <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} value={Description} onChange={e => setDescription(e.target.value)}></textarea>
                                                            </div>
                                                            <hr />
                                                            <div className="col-sm-12">
                                                                <span className="bigger-110">Chọn người chủ trì</span>
                                                                <Multiselect
                                                                    displayValue="label"
                                                                    onRemove={setUservip}
                                                                    onSearch={function noRefCheck() { }}
                                                                    onSelect={selectUserVip}
                                                                    options={user_list}
                                                                    selectedValues={user_vip}
                                                                    placeholder="Có thể tìm theo vần"
                                                                />
                                                            </div>
                                                            <hr />
                                                            <div className="col-sm-12">
                                                                <span className="bigger-110">Chọn những người điều khiển</span>
                                                                <Multiselect
                                                                    displayValue="label"
                                                                    onRemove={setUsercontrol}
                                                                    onSearch={function noRefCheck() { }}
                                                                    onSelect={selectUserControl}
                                                                    options={user_list}
                                                                    selectedValues={user_control}
                                                                    placeholder="Có thể tìm theo vần"
                                                                />
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

                                                        </div>
                                                        <div className="col-xs-12 col-sm-6">
                                                            {success && userEdit !== null
                                                                ? <CalendarSeclectUserEdit user_list={user_list} handleUserSelect={handleUserSelect} userEdit={userEdit} />
                                                                : <ProgressComponent />
                                                            }
                                                        </div>
                                                        <hr />
                                                        <div className="col-sm-6 wizard-actions">
                                                            <button type="submit" className="btn-sm btn-success" onClick={updateCalendarForm}>
                                                                Cập nhật
                                                                {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                            </button>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <button type="submit" className="btn-sm ">
                                                                <Link to="/cal_meet" >
                                                                    Trở về danh sách phòng họp
                                                                    {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                                </Link>
                                                            </button>
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
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default withRouter(CalendarEditRoom);