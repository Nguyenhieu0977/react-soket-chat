import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getUsers, getProfiles } from '../users/UserActions';
import { getCalendar, deleteCalendar } from "./CalendarActions";
import CalendarListItem from './CalendarListItem'
import CalendarPagination from './CalendarPagination';
import CalendarToday from './CalendarToday';
import moment from 'moment'

import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function CalendarList(props) {
    const { handleUpdate } = props

    const dataUser = useSelector(state => state.users.data);
    const profiles = useSelector(state => state.profiles.data);
    const data = useSelector((state) => state.calendars.calendars);
    // const dataRoom = dataRooms.filter((item) => item.Id === Id)[0]
    const [userSelected, setUserSelected] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [idSelected, setIdSelected] = useState()
    const [activeIndex, setActiveIndex] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const calPerPage = 5
    const pageVisited = pageNumber * calPerPage

    data.sort((a, b) => {
        if (a.StartTime > b.StartTime) {
            return -1;
        }
        if (a.StartTime < b.StartTime) {
            return 1;
        }
        return 0;
    });

    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCalendar())
        dispatch(getUsers())
        dispatch(getProfiles())
    }, [])

    const handleEdit = (Id, dataUserSelect) => {
        setUserSelected(dataUserSelect.User_room)
        setIdSelected(Id)
        setIsSelected(true)
    }
    // console.log(idSelected)
    const List_user_room = dataUser?.filter(items => userSelected.includes(items.id)).map((item, index) => {
        return (
            <tr key={index}>
                <td >
                    {index + 1}
                </td>
                <td >
                    {profiles.find(p => p.user === item.id).first_name ? profiles.find(p => p.user === item.id).first_name : item.username}
                </td>
                <td style={{textAlign:"center", color:"green"}}>
                    {(() => {
                        switch (String(item.groups)) {
                            case '1':
                                return <span >Quản trị hệ thống </span>
                            case '2':
                                return <span style={{fontWeight:"bold", color:"blue"}}>Chủ trì phòng họp </span>
                            default:
                                return <span >Thành viên </span>
                        }
                    })()}

                </td>
            </tr>
        )
    })

    const handleDel = (Id) => {
        dispatch(deleteCalendar(Id))
    }

    const pageCount = Math.ceil(data.length / calPerPage)
    const List_calendar = data
        .slice(pageVisited, pageVisited + calPerPage)
        .map((calendar, index) => {
            const className = activeIndex === index ? 'active' : 'disable';
            return (
                <CalendarListItem setIsSelected={setIsSelected} setActiveIndex={setActiveIndex} className={className} idSelected={idSelected} key={index} index={index} calendar={calendar} profiles={profiles} pageVisited={pageVisited} handleEditCalendar={handleEdit} handleDelCalendar={handleDel} />
            )
        });

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const today = new Date()

    // console.log(moment(today).format("DD-MM-YY").toString())

    const CalendarTodays = data?.filter(x => moment(x.StartTime).format("DD-MM-YY").toString() === moment(today).format("DD-MM-YY").toString()).map((cal, index) => {
        return (
            <CalendarToday key={index} index={index} cal={cal} />
        )
    })

    return (
        <div className="row" style={{ marginLeft: "-24px", marginRight: "-24px", backgroundColor:"white" }}>
            <div className="col-xs-12 col-sm-8">
                <div className="control-group">
                    <div className="dataTables_wrapper form-inline no-footer" style={{ flex: 1, maxHeight: '76vh', overflowY: 'auto' }}>
                        <table id="simple-table" className="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th >TT</th>
                                    <th >Tiêu đề cuộc họp</th>
                                    <th >Thời gian bắt đầu</th>
                                    <th >Thời gian kết thúc</th>
                                    <th >Trạng thái</th>
                                    <th className="hidden-480" style={{ width: "120px" }}>
                                        <button className="pull-right btn-sm btn-white btn-round">
                                            <Link to='/cal_add'>
                                                <i className="menu-icon fa fa-plus" />&nbsp;
                                                <span className="menu-text">Thêm mới</span>
                                            </Link>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {List_calendar}
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="dataTables_wrapper form-inline no-footer" >
                    <CalendarPagination pageCount={pageCount} onPageChange={changePage} counts={data?.length} pageVisited={pageVisited} />
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-4">
                {isSelected ?
                    <div className="control-group" >
                        <div className="dataTables_wrapper form-inline no-footer" style={{ flex: 1, maxHeight: '84vh', overflowY: 'auto' }}>

                            <table id="simple-table" className="table  table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th style={{textAlign:"center"}}>TT</th>
                                        <th style={{textAlign:"center"}}>Tên thành viên</th>
                                        <th style={{textAlign:"center"}}>Vai trò</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        List_user_room
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    :
                    <div className="widget-box" style={{ marginTop: "0px" }}>
                        <div className="widget-header">
                        </div>
                        <div className="widget-body">
                            <div className="widget-main" >
                                <div className="row" >
                                    <div style={{ display: 'flex', justifyContent: "center" }}>
                                        <Clock
                                            value={value}
                                            size={235}
                                        />
                                    </div>
                                    <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>Ngày {moment().format("DD-MM-YYYY")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default CalendarList
