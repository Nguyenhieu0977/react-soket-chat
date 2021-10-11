import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useLocation   } from "react-router-dom";

import { getUsers, getProfiles, getProfile, getUnits, deleteUser, deleteProfile } from '../users/UserActions';
import UserListItem from './UserListItem'
import UserPagination from './UserPagination';
import UserAdd from './UserAdd';
import ProfileUpdate from './ProfileUpdate';
import Recursive from './Recursive';

import Modal from '@material-ui/core/Modal';

function UserList(props) {
    const location  = useLocation ();
    // const { handleUpdate } = props
    const [userSelected, setUserSelected] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [idSelected, setIdSelected] = useState()
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dataNew, setDataNew] = useState();
    const [idUser, setIdUser] = useState(0);
    const [idPro, setIdPro] = useState(1);
    const [unitId, setUnitId] = useState(1);
    
    const data = useSelector(state => state.users.data);
    const profiles = useSelector(state => state.profiles.data);
    const units = useSelector(state => state.units.data);
    const [proF, setProF] = useState(profiles)
    const pf = profiles.filter((p) => unitId === p.unit_id)
    console.log(location.pathname.split('/')[2])
    console.log(profiles)
    console.log(pf)
    // const dataRoom = dataRooms.filter((item) => item.Id === Id)[0]
    

    const [pageNumber, setPageNumber] = useState(0);
    const calPerPage = 10
    const pageVisited = pageNumber * calPerPage

    // data.sort((a, b) => {
    //     if (a.StartTime > b.StartTime) {
    //         return -1;
    //     }
    //     if (a.StartTime < b.StartTime) {
    //         return 1;
    //     }
    //     return 0;
    // });
    const dispatch = useDispatch();

    useEffect(() => {
        setUnitId(parseInt(location.pathname.split('/')[2]))
    }, [location.pathname.split('/')[2]])

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getUnits())
    }, [])
    useEffect(() => {
        dispatch(getProfiles(unitId))
    }, [unitId])

    const handleEdit = (Id, dataUserSelect) => {
        setUserSelected(dataUserSelect.User_room)
        setIdSelected(Id)
        setIsSelected(!isSelected)
    }

    const handleEditUser = (id) => {
        setOpen2(true)
        let idnew = profiles.find(p => p.id === id).id
        console.log(idnew)
        setIdUser(idnew)
        dispatch(getProfile(id))
    }



    const handleDelUser = (id, user) => {
        const username = data.find(u=>u.id===user).username
        console.log(username)
        dispatch(deleteUser(username))
        dispatch(deleteProfile(id))
    }

    const pageCount = Math.ceil(profiles?.length / calPerPage)
    const List_User = profiles?.slice(pageVisited, pageVisited + calPerPage)
        .map((user, index) => {
            return (
                <UserListItem setOpen2={setOpen2} handleDelUser={handleDelUser} handleEditUser={handleEditUser} key={index} index={index} user={user} pageVisited={pageVisited} />
            )
        });

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleFormAdd = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    

    const selectUnit = units.map((item) => {
        return (
            <Recursive item={item} children={item.children} key={item.id} />
        )

    })

    return (
        <div className="row" style={{ marginLeft: "-12px", marginRight: "-12px" }}>
            <div className="col-xs-12 col-sm-3">
                <div className="widget-box" style={{ marginTop: "0px" }}>
                    <div className="widget-header">
                        <h5 className="widget-title">Đơn vị</h5>
                    </div>
                    <div className="widget-body">
                        <div className="widget-main" style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto' }}>

                            <ul>
                                {selectUnit}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={open2 ? "col-xs-12 col-sm-6" : "col-xs-12 col-sm-9"} >
                <div className="control-group">
                    <div className="dataTables_wrapper form-inline no-footer" style={{ flex: 1, maxHeight: '76vh', overflowY: 'auto' }}>
                        <table id="simple-table" className="table  table-bordered table-hover">
                            <thead>
                                <tr >
                                    <th style={{ textAlign: "center" }}>TT</th>
                                    <th style={{ textAlign: "center" }}></th>
                                    <th style={{ textAlign: "center" }}>Họ và tên </th>
                                    <th style={{ textAlign: "center" }}>Tên hiển thị</th>
                                    <th style={{ textAlign: "center" }}>Vai trò</th>
                                    <th style={{ textAlign: "center" }}>Số điện thoại</th>
                                    <th style={{ textAlign: "center" }}>Ngày tạo</th>
                                    <th style={{ textAlign: "center" }}>Trạng thái</th>
                                    <th className="hidden-480" style={{ width: "120px" }}>
                                        <button className="pull-right btn-sm btn-white btn-round" onClick={handleFormAdd}>
                                            <i className="menu-icon fa fa-plus" />&nbsp;
                                            <span className="menu-text">Thêm mới</span>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {List_User}
                            </tbody>
                        </table>
                    </div>
                    <div className="dataTables_wrapper form-inline no-footer" >
                    <UserPagination pageCount={pageCount} onPageChange={changePage} counts={data?.length} pageVisited={pageVisited} />

                    </div>

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
            {open2 &&
                <div className="col-xs-12 col-sm-3">
                    <div className="widget-box" style={{ marginTop: "0px" }}>
                        <div className="widget-header">
                            <h5 className="widget-title">Cập nhật thông tin tài khoản</h5>
                        </div>
                        <div className="widget-body">
                            <div className="widget-main" >
                                <div className="row">
                                    <div style={{ display: 'flex', justifyContent: "center" }}>

                                        <ProfileUpdate id={idUser} setOpen2={setOpen2} />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default withRouter(UserList)



