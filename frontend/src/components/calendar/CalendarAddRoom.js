import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import ProgressComponent from '@material-ui/core/CircularProgress';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Multiselect from 'multiselect-react-dropdown';
import CalendarSelectUser from './CalendarSeclectUser'
import { getUsers, getProfiles } from '../users/UserActions';
import { addCalendar } from './CalendarActions'
import Select from "react-select";
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"
import UserAdd from '../users/UserAdd';
import Modal from '@material-ui/core/Modal';


function CalendarAddRoom() {

    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [user_control, setUser_control] = useState([]);
    const [user_vip, setUser_vip] = useState([]);
    const [Description, setDescription] = useState();
    const [userAdd, setUserAdd] = useState();
    const [addSuccess, setAddSuccess] = useState(true);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const data = useSelector(state => state.users.data);
    const profiles = useSelector(state => state.profiles.data);
    // console.log(profiles)
    // const responseting = useSelector(state => state.users.responseting);
    // const messege = useSelector(state => state.users.messege);
    const success = useSelector(state => state.users.success);
    // console.log(data.data)

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getProfiles())
    }, [])

    const user_list = data?.map(u => {
        const label = profiles?.find(p => p.user === u.id)?.first_name ? profiles.find(p => p.user === u.id)?.first_name : u.username
        return ({ "value": u.id, "label": label })
    })

    // const user_Control = data?.map(u => {
    //     const label = profiles?.find(p => p.user === u.id)?.first_name ? profiles.find(p => p.user === u.id)?.first_name : u.username
    //     return { id: u.id, label: label }
    // })

    const eventType2 = [
        { value: 0, label: "??u ti??n cao" },
        { value: 1, label: "??u ti??n trung b??nh" },
        { value: 2, label: "??u ti??n th???p" }
    ]
    const handleChangePro = (EventTypes) => {
        setEventTypes(EventTypes)
    }
    const selectUserControl = (selectedList, selectedItem) =>{
        // console.log(selectedList);
        // console.log(selectedItem);
        setUser_control(selectedList)
    }
    const selectUserVip = (selectedList, selectedItem) =>{
        // console.log(selectedItem);
        setUser_vip(selectedList)
    }


    
    const handleUserSelect = (values) => {
        setUserAdd(values)
    }

    const addCalendarForm = (event) => {
        event.preventDefault();
        var User_room = Array.isArray(userAdd) ? userAdd.map(x => x.value) : []
        var User_control = Array.isArray(user_control) ? user_control.map(x => x.value) : []
        var User_vip = Array.isArray(user_vip) ? user_vip.map(x => x.value) : []
        var EventType = EventTypes.value
        let calendarAdd = {
            Subject, EventType, StartTime, EndTime, Location, Description, User_room, User_control, User_vip
        }
        if (calendarAdd) {
            dispatch(addCalendar(calendarAdd));
            setAddSuccess(true)
        }
        // setSubject("")
        // setEventTypes("")
        // setStartTime("")
        // setEndTime("")
        // setLocation("")
        // setDescription("")
    }

    const handleFormAdd = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* <CalendarBreadcrumb /> */}
                        <div className="page-content">

                            <div className="row">
                                <div className="widget-box">
                                    <div className="widget-header">
                                        <h4 className="widget-title">Th??m m???i cu???c h???p</h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-main">
                                            <div className="row">

                                                {/* <form > */}
                                                <div className="col-xs-12 col-sm-6">
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">Ti??u ????? cu???c h???p</span>
                                                        <input id="Summary" className="e-field e-input" type="text" name="Subject" value={Subject} style={{ width: '100%' }} onChange={e => setSubject(e.target.value)} />
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">M?? t??? cu???c h???p</span>
                                                        <textarea id="Description" className="e-field e-input" name="Description" rows={2} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} value={Description} onChange={e => setDescription(e.target.value)}></textarea>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">Ch???n ng?????i ch??? tr??</span>
                                                        <Multiselect
                                                            displayValue="label"
                                                            onRemove={function noRefCheck() { }}
                                                            onSearch={function noRefCheck() { }}
                                                            onSelect={selectUserVip}
                                                            options={user_list}
                                                            placeholder="Ch???n ng?????i ch??? tr??"
                                                        />
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">Ch???n nh???ng ng?????i ??i???u khi???n</span>
                                                        <Multiselect
                                                            displayValue="label"
                                                            onRemove={function noRefCheck() { }}
                                                            onSearch={function noRefCheck() { }}
                                                            onSelect={selectUserControl}
                                                            options={user_list}
                                                            placeholder="Ch???n ng?????i ??i???u khi???n"
                                                        />
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">Th???i gian b???t ?????u</span>
                                                        <DateTimePickerComponent id="StartTime" format='dd/MM/yyyy hh:mm a' data-name="StartTime" className="e-field" value={StartTime} onChange={e => setStartTime(e.target.value)}></DateTimePickerComponent>
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">Th???i gian k???t th??c</span>
                                                        <DateTimePickerComponent id="StartTime" format='dd/MM/yyyy hh:mm a' data-name="EndTime" className="e-field" value={EndTime} onChange={e => setEndTime(e.target.value)} ></DateTimePickerComponent>
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-12">
                                                        <span className="bigger-110">?????a ??i???m</span>
                                                        <input id="Location" className="e-field e-input" type="text" name="Location" style={{ width: '100%' }} value={Location} onChange={e => setLocation(e.target.value)} />
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-7">
                                                        <span className="bigger-110">M???c ?????c ??u ti??n</span>
                                                        <Select
                                                            value={EventTypes}
                                                            onChange={handleChangePro}
                                                            options={eventType2}
                                                            placeholder={"Ch???n m???c ????? m??u ti??n"}
                                                        />
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div className="col-xs-12 col-sm-6">
                                                    {success
                                                        ? <CalendarSelectUser user_list={user_list} handleUserSelect={handleUserSelect} addSuccess={addSuccess} />
                                                        : <ProgressComponent />
                                                    }

                                                </div>
                                                <div className="space"></div>
                                                <div className="col-sm-6" style={{ textAlign: "right", marginTop: "12px" }}>
                                                    <button type="submit" className="btn-sm btn-success" onClick={addCalendarForm}>
                                                        Th??m m???i
                                                        {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                    </button>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <button type="submit" className="btn-sm">
                                                        <Link to="/cal_meet" >
                                                            {/* <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" /> */}
                                                            Tr??? v??? danh s??ch ph??ng h???p

                                                        </Link>
                                                    </button>
                                                </div>
                                                <div className="space"></div>
                                                <div className="col-sm-6" style={{ textAlign: "right", marginTop: "12px" }}>
                                                    {/* <button type="submit" className="btn-sm"> */}
                                                    {/* <a onClick={handleFormAdd} style={{cursor: 'pointer'}}> */}
                                                    <Link to={'/user-create'} style={{ cursor: 'pointer' }}>
                                                        <i className="ace-icon fa fa-plus icon-on-right bigger-110" />&nbsp;
                                                        <b>T???o t??i kho???n ng?????i d??ng</b>
                                                    </Link>
                                                    {/* </a> */}
                                                    {/* </button> */}
                                                </div>
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <UserAdd setOpen={setOpen} />
                </Modal>
                <Footer />
            </div>
        </>
    );
}

export default withRouter(CalendarAddRoom);