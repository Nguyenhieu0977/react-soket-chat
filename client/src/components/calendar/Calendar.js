// import './index.css';
import React, { useState, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import moment from 'moment';

import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop, ResourcesDirective, ResourceDirective, } from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';

import "./material.css";
import { addCalendar, getCalendar, updateCalendar, deleteCalendar } from "./CalendarActions";
import FormCalendar from './FormCalendar'
import CalendarBreadcrumb from "./CalendarBreadcrumb";
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Lưu',
            'cancelButton': 'Đóng',
            'deleteButton': 'Xóa',
            'newEvent': 'Thêm mới Lịch hội nghị!',
            'editEvent': 'Chỉnh sửa Lịch hội nghị!',
            'deleteEvent': 'Xóa Lịch hội nghị!',
            'editButton': 'Chỉnh sửa',
            'cancelButton': 'Thoát',

        },
    }
});
/**
 * Schedule editor template sample
 */
function getNextId(id) {
    return id === 3 ? 0 : id + 1;
}
// const initialResource = fetchProfileData(0);
function Calendar() {
    const [count, setCount] = useState(0);
    // const [resource, setResource] = useState(initialResource);
    const [Subject, setSubject] = useState();
    const [EventType, setEventType] = useState();
    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();
    const [Description, setDescription] = useState();
    const [fields, setFields] = useState({ text: 'OwnerText', value: 'Id' });
    // const [fieldEventType, setFieldEventType] = useState({ text: 'EventTypeText', value: 'Id' });
    // const fields = { text: 'OwnerText', value: 'Id' };
    // let [event, setEvent] = useState({Subject: "", EventType: "", StartTime: "", EndTime: "", Description:""});
    const dispatch = useDispatch();
    const data = useSelector((state) => state.calendars.calendars); //.results
    // const data = dataSource.scheduleData;
    
    // console.log(data)
    useEffect(() => {
        dispatch(getCalendar())
    }, [])

    // const [valueTime, setValueTime] = useState(new Date());
    // useEffect(() => {
    //     const interval = setInterval(
    //         () => setValueTime(new Date()),
    //         1000
    //     );
    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, []);

    const eventType2 = [
        { label: "Ưu tiên cao", value: 0 },
        { label: "Ưu tiên trung bình", value: 1 },
        { label: "Ưu tiên thấp", value: 2 }
    ]

    const eventType = [
        { OwnerText: "Ưu tiên cao", Id: 0, OwnerColor: '#ffaa00' },
        { OwnerText: "Ưu tiên trung bình", Id: 1, OwnerColor: '#f8a398' },
        { OwnerText: "Ưu tiên thấp", Id: 2, OwnerColor: '#7499e1' }
    ]

    function onEventRendered(args) {
        switch (args.data.EventType) {
            case 1:
                args.element.style.backgroundColor = '#F57F17';
                break;
            case 2:
                args.element.style.backgroundColor = '#7fa900';
                break;
            case 3:
                args.element.style.backgroundColor = '#8e24aa';
                break;
        }
    }
    let ownerData = [
        { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
        { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
        { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
    ];
    const addEventClose = (args) => {
        if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
            // setSubject(args.data.Subject);
            // setEventType(args.data.EventType);
            // setStartTime(moment(args.data.StartTime).format());
            // setEndTime(moment(args.data.EndTime).format());
            // // setEndTime(moment(args.data.EndTime).format("YYYY-MM-DD hh:mm A"));
            // setDescription(args.data.Description);

            dispatch(addCalendar(args.data));
        }
        // if (args.type === 'DeleteAlert' && !isNullOrUndefined(args.data)) {
        //     dispatch(deleteCalendar(args.data.Id));
        // }
        // else if (args.type === 'EditEventInfo' && !isNullOrUndefined(args.data)) {
        //     dispatch(updateCalendar(args.data.Id, args.data));
        // }
    }
    
    function editorTemplate(props) {
        
        return ((props !== undefined) ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
            <tr><td className="e-textlabel">Tiêu đề</td><td style={{ colspan: '4' }}>
                <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
            </td></tr>
            <tr><td className="e-textlabel">Trạng thái</td><td style={{ colspan: '4' }}>
                <DropDownListComponent id="EventType" placeholder='Chọn mức độ mưu tiên' data-name='EventType' className="e-field" style={{ width: '100%' }} dataSource={eventType} fields={fields}  >
                </DropDownListComponent>
            </td></tr>
            <tr><td className="e-textlabel">Thời gian bắt đầu</td><td style={{ colspan: '4' }}>
                <DateTimePickerComponent id="StartTime" format='dd/MM/yyyy hh:mm a' data-name="StartTime" className="e-field" ></DateTimePickerComponent>
            </td></tr>
            <tr><td className="e-textlabel">Thời gian kết thúc</td><td style={{ colspan: '4' }}>
                <DateTimePickerComponent id="EndTime" format='dd/MM/yyyy hh:mm a' data-name="EndTime" className="e-field" ></DateTimePickerComponent>
            </td></tr>
            <tr><td className="e-textlabel">Thành viên tham gia</td><td colSpan={4}>
                <MultiSelectComponent id="User_room" className="e-field" placeholder='Chọn thành viên tham gia' data-name="User_room" dataSource={ownerData} fields={fields} />
            </td></tr>
            <tr><td className="e-textlabel">Địa điểm</td><td style={{ colspan: '4' }}>
                <input id="Location" className="e-field e-input" type="text" name="Location" style={{ width: '100%' }} />
            </td></tr>
            <tr><td className="e-textlabel">Mô tả nội dung họp</td><td style={{ colspan: '4' }}>
                <textarea id="Description" className="e-field e-input" name="Description" rows={2} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} ></textarea>
            </td></tr>
        </tbody>
        </table> : <div></div>);
    }

    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* <CalendarBreadcrumb /> */}
                        {/* <div className="page-content"> */}
                            <div className="row">

                                <div className="col-xs-12 col-sm-12">
                                    <div className="control-group">

                                        <div className="control-section">
                                            <ScheduleComponent width='100%' height='88vh'
                                                selectedDate={new Date()}
                                                eventSettings={{ dataSource: data }}
                                                editorTemplate={editorTemplate}
                                                // showQuickInfo={false}
                                                eventRendered={onEventRendered}
                                                popupClose={addEventClose}
                                                currentView='Month'
                                            >
                                                {/* <ResourcesDirective>
                                <ResourceDirective field='OwnerId' title='Owner' name='Owners' allowMultiple={false} dataSource={ownerData} textField='OwnerText' idField='Id' allowGroupEdit={false} colorField='OwnerColor'></ResourceDirective>
                            </ResourcesDirective> */}
                                                <ViewsDirective>
                                                    <ViewDirective option='Day' />
                                                    <ViewDirective option='Week' />
                                                    <ViewDirective option='WorkWeek' />
                                                    <ViewDirective option='Month' />
                                                </ViewsDirective>
                                                <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
                                            </ScheduleComponent>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-xs-12 col-sm-4">

                                    <div class="widget-box" style={{ marginTop: "0px" }}>
                                        <div class="widget-header">
                                        </div>
                                        <div class="widget-body">
                                            <div className="widget-main" >
                                                <div class="row">
                                                    <div style={{ display: 'flex', justifyContent: "center" }}>
                                                        <Clock
                                                            value={valueTime}
                                                            size={235}
                                                        />
                                                    </div>
                                                    <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>Ngày {moment().format("DD-MM-YYYY")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        {/* </div> */}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Calendar;