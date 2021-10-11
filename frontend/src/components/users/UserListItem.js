import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import CalendarListDetail from './CalendarListDetail';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));



function UserListItem(props) {
    const classes = useStyles();
    const { index, pageVisited, user, handleDelUser, handleEditUser } = props

    const dispatch = useDispatch();

    const handleEdit = (id) => {
        handleEditUser(id)
    }
    const handleDel = (id, user) => {
        handleDelUser(id, user)
    }

    return (
        <>
            <tr key={index}>
                <td style={{ textAlign: "center" }}>
                    {index + pageVisited + 1}
                </td>
                <td style={{ textAlign: "center" }}>
                    <div className={classes.root}>
                        {/* <Avatar alt={user.last_name} src={user.image} className={classes.small} style={{margin:"0px"}} /> */}
                        <Avatar alt={user.last_name} src={`http://localhost:8000${user.image}`} style={{margin:"-6px", }} />
                        {/* <Avatar alt="Khac Hieu" src={user.image} className={classes.large} /> */}
                    </div>
                </td>
                <td >
                    <span >{user.first_name}</span>
                </td>
                <td >
                    <span >{user.last_name}</span>
                </td>
                <td style={{ textAlign: "center" }} >
                    {(() => {
                        switch (String(user.groups)) {
                            case '1': return <span>Quản trị hệ thống</span>;
                            case '2': return <span>Chủ trì phòng họp</span>;
                            case '3': return <span>Thành viên</span>;
                            default: return <span>Thành viên</span>;
                        }
                    })()}

                </td>
                <td style={{ textAlign: "center" }}>
                    {user.phone &&
                        <span>{user.phone} </span>
                    }
                </td>
                <td style={{ textAlign: "center" }}>
                    {user.date_joined &&
                        <span>{moment(user.date_joined).format("hh:mm A - DD/MM/YYYY").toString()} </span>
                    }
                </td>
                <td style={{ textAlign: "center", color: "green" }}>
                    {(() => {
                        switch (user.is_active) {
                            case true: return <span>Đã kích hoạt</span>;
                            default: return <span>Chưa kích hoạt</span>;
                        }
                    })()}
                    <span>{user.is_active}</span>
                </td>
                <td>
                    <div className="hidden-sm hidden-xs ">
                        <button className='btn-xs btn-success' >
                            <i className='ace-icon bigger-120 fa fa-eye' title="Xem chi tiết" />
                        </button>
                        <button className='btn-xs btn-btn-info' onClick={() => handleEdit(user.id)}>
                            {/* <Link to={`/user_edit/${user.id}`}> */}
                            <i className="ace-icon fa fa-pencil bigger-120" />
                            {/* </Link> */}
                        </button>
                        <button className="btn-xs btn-danger">
                            <i className="ace-icon fa fa-trash-o bigger-120" onClick={() => handleDel(user.id, user.user)} />
                        </button>
                        {/* <button className="btn-xs btn-warning">
                            <i className="ace-icon fa fa-flag bigger-120" />
                        </button> */}
                    </div>

                </td>
            </tr>
            {/* {Id ? <CalendarListDetail  calendar={props.calendar} idSelected={idSelected} isActive={isActive} isActive2={isActive2} pageVisited={pageVisited} index={index} handleEditCalendar={handleEditCalendar}/> : ""} */}
        </>
    )
}

export default UserListItem

