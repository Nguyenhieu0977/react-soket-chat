// import './index.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop, ResourcesDirective, ResourceDirective, } from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
// import "./material.css";
import { addCalendar, getCalendar, updateCalendar, deleteCalendar } from "./CalendarActions";


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

function CalendarHome() {
    const [fields, setFields] = useState({ text: 'OwnerText', value: 'Id' });
    const dispatch = useDispatch();
    const data = useSelector((state) => state.calendars.calendars); //.results

    useEffect(() => {
        dispatch(getCalendar())
    }, [])

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
    const dataEventClose = (args) => {
        if (args.type !== 'Editor' && !isNullOrUndefined(args.data)) {
            dispatch(addCalendar(args.data));
        } else{
            dispatch(updateCalendar(args.data));
        }
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
        <ScheduleComponent width='100%' height='78vh'
            selectedDate={new Date()}
            eventSettings={{ dataSource: data }}
            editorTemplate={editorTemplate}
            showQuickInfo={false}
            eventRendered={onEventRendered}
            popupClose={dataEventClose}
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
    );
}

export default CalendarHome;