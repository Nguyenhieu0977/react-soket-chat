import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Select from "react-select";
import { addCalendar } from "./CalendarActions";

function FromCalendar({ eventType2, ownerData }) {
    
    const [selectedOption, setSelectedOption] = useState();
    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [Description, setDescription] = useState();
    const [User_rooms, setUser_rooms] = useState([]);
    // const [fields, setFields] = useState({ text: 'OwnerText', value: 'Id' });

    const dispatch = useDispatch();

    const handleChange = User_rooms => {
        setUser_rooms(User_rooms)
        // var Id_users = Array.isArray(User_room)?User_room.map(x=>x.value):[]
    };

    const handleChangePro = (EventTypes) => {
        setEventTypes(EventTypes)
    }

    const addCalendarForm = (event) => {
        event.preventDefault();
        var User_room = Array.isArray(User_rooms) ? User_rooms.map(x => x.value) : []
        var EventType = EventTypes.value
        let calendarAdd = {
            Subject, StartTime, EndTime, EventType, Location, Description, User_room
        }
        dispatch(addCalendar(calendarAdd));
        //clear dataForm
        setSubject("")
        setEventTypes("")
        setStartTime("")
        setEndTime("")
        setLocation("")
        setDescription("")
        setUser_rooms("")
    }
    return (
        <div className="widget-box">
            <div className="widget-header">
                <h4 className="widget-title">Thêm mới cuộc họp</h4>
            </div>
            <div className="widget-body">
                <div className="widget-main">
                    <div className="row">
                        <form>
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
                                {/* <DropDownListComponent id="EventType" placeholder='Chọn mức độ mưu tiên' data-name='EventType' className="e-field" style={{ width: '100%' }} dataSource={eventType} fields={fields}  onChange={onChangeType} >
                            </DropDownListComponent> */}
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
                                <textarea id="Description" className="e-field e-input" name="Description" rows={2} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} value={Description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>


                            <hr />

                            <div className="col-sm-12">
                                <span className="bigger-110">Chọn thành viên</span>
                                {/* <MultiSelectComponent id="User_room" className="e-field" placeholder='Chọn thành viên tham gia' data-name="User_room" dataSource={ownerData} fields={fields} value={User_room} change={onChangeUser}/> */}
                                <Select
                                    isMulti={true}
                                    value={User_rooms}
                                    onChange={handleChange}
                                    options={ownerData}
                                    placeholder={"Chọn thành viên tham gia"}
                                />
                            </div>
                            {/* <div className="col-sm-6">
                                {User_rooms ? (
                                    <div>
                                        <h3>Thành viên tham gia</h3>
                                        <ul>
                                            {User_rooms.map((option) =>
                                                <li key={option.value}>
                                                    {option.label}
                                                </li>
                                            )}
                                        </ul>
                                    </div>) : ''
                                }
                            </div> */}

                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-sm btn-success" onClick={addCalendarForm}>
                                    Thêm mới
                                    <i className="ace-icon fa fa-arrow-right icon-on-right bigger-110" />
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FromCalendar;