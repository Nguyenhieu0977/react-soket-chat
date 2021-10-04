import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ColumnSelect from 'react-column-select'


function EditCalendar(props) {
    const { eventType2, ownerData, hobbies, itemCalendar, Id_cal } = props
    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [Description, setDescription] = useState();
    const [User_rooms, setUser_rooms] = useState(hobbies);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selected, setSelected] = useState([])

    useEffect(() => {
        setSubject(itemCalendar.Subject)
        setEventTypes(itemCalendar.EventType)
        setStartTime(itemCalendar.StartTime)
        setEndTime(itemCalendar.EndTime)
        setLocation(itemCalendar.Location)
        setDescription(itemCalendar.Description)
        setUser_rooms(hobbies)

        return () => {
            setSubject()
            setEventTypes()
            setStartTime()
            setEndTime()
            setLocation()
            setDescription()
            setUser_rooms()
        }
        // const User_room_selected = (itemCalendar.User_room) {
        //     itemCalendar.User_room.map(x=>x.)
        // }
    }, [Id_cal])


    const onChange = (values) => {
        setSelected(values)

    }
    console.log(selected)
    console.log(User_rooms)
    console.log(Subject)


    return (
        <div className="widget-box">
            <div className="widget-header">
                <h4 className="widget-title">Cập nhật cuộc họp</h4>
            </div>
            <div className="widget-body">
                <div className="widget-main">
                    <div className="row">
                        <form>
                            <div className="col-sm-12">
                                <span className="bigger-110">Chọn thành viên</span>

                                <ColumnSelect
                                    defaultValue={User_rooms}
                                    options={ownerData}
                                    onChange={onChange}
                                    leftHeader='Danh sach chon thanh vien'
                                    rightHeader='Danh sach thanh vien duoc chon'
                                    isSearchable
                                    searchFocusBorderColor=""
                                    theme={{
                                        buttonBgColor: '#CBD5E0',
                                        columnBgColor: '#CBD5E0',
                                        columnBorderColor: '#cfa4ff',
                                        headerBgColor: '#d6b1ff',
                                        searchFocusBorderColor: '',
                                        textColor: '#000000'
                                    }}
                                />
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditCalendar;