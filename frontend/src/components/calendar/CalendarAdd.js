import React, { useState, useEffect } from "react";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Select from "react-select";

function CalendarAdd(props) {
    const { handleInfoRoom } = props;
    const [Subject, setSubject] = useState();
    const [EventTypes, setEventTypes] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Location, setLocation] = useState();
    const [Description, setDescription] = useState();
    const [isState, setIsState] = useState(false);


    const handleChangePro = (EventTypes) => {
        setEventTypes(EventTypes)
    }

    const eventType2 = [
        { value: 0, label: "Ưu tiên cao" },
        { value: 1, label: "Ưu tiên trung bình" },
        { value: 2, label: "Ưu tiên thấp" }
    ]

    const EventType = EventTypes.value
    const dataAdd = (Subject, EventType, StartTime, EndTime, Location, Description)
    
    handleInfoRoom(dataAdd)
        
    // const handleInfoRoom = () => {
    //     const dataInfoRoom = {
    //         Subject, EventTypes, StartTime, EndTime, Location, Description,
    //     }
    // }

    return (
        <div className="col-xs-12 col-sm-12">
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
                    value={EventType}
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
    )
}

export default CalendarAdd
