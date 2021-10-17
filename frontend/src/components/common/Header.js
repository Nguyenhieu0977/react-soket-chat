// frontend/src/components/dashboard/Dashboard.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getProfile, resetPassword } from '../users/UserActions';
import { logout } from "../login/LoginActions";

const Header = (props) => {
  const { user } = useSelector((state) => state.auth);
  const profile = useSelector(state => state.profile.data);
  const [resetPass, setResetPass] = useState(false)
  const [passwordNew, setPasswordNew] = useState()
  const [passwordOld, setPasswordOld] = useState()

  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout())
  }
  useEffect(() => {
    dispatch(getProfile(user.id))
  }, [])

  const handleResetPass = () => {
    setResetPass(true)
  }

  const handleSavePass = () => {
    let dataReset = {
      new_password: passwordNew,
      current_password: passwordOld
    }
    dispatch(resetPassword(dataReset))
  }

  return (
    <div id="navbar" className="navbar navbar-default ace-save-state navbar-fixed-top">
      <div className="navbar-container ace-save-state" id="navbar-container">

        <div className="navbar-header pull-left">
          <a href="/" className="navbar-brand"><small><i className="fa fa-th-large " /> &nbsp;&nbsp;CÔNG NGHỆ THÔNG TIN QUÂN KHU 7</small>
          </a>
        </div>
        {user.username ? (
          <>
            <div className="navbar-buttons navbar-header pull-right" role="navigation">
              <ul className="nav ace-nav">

                <li className="light-blue dropdown-modal">
                  <a data-toggle="dropdown" href="#" className="dropdown-toggle">
                    {/* className="user-info"  */}
                    {profile?.image &&
                      <img className="nav-user-photo" src={`http://cntt.qk7.bqp:8000${(profile.image).replace("http://cntt.qk7.bqp:8000", "")}`} alt="CNTT Photo" />
                    }
                    <span ><small>Xin chào,&nbsp;</small>{profile?.first_name ? profile.first_name : user.username}</span>
                    <i className="ace-icon fa fa-caret-down" />
                  </a>
                  <ul className='user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close' >

                    {/* <li onClick={handleResetPass}> */}
                    <li >
                      <a><i className="ace-icon fa fa-cog" />Thay đổi mật khẩu</a>
                    </li>
                    <li className="divider" />

                    {/* {resetPass && */}

                    <li style={{ width: "300px" }}>
                      <form>
                        <div className="input-group">
                          <span className="input-group-addon">
                            Mật hiện tại&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          <input type="password" className="form-control search-query" placeholder="Nhập mật khẩu hiện tại" value={passwordOld} onChange={(e) => setPasswordOld(e.target.value)} />

                        </div>
                        <div className="input-group" >
                          <span className="input-group-addon">
                            Mật khẩu mới&nbsp;
                          </span>
                          <input type="password" className="form-control search-query" placeholder="Nhập mật khẩu mới" value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} />

                        </div>

                        <div className="input-group">
                          <span className="input-group-addon">
                            <button type="button" className="btn-green btn-sm" onClick={handleSavePass}>
                              <span className="ace-icon fa fa-save icon-on-right bigger-110"></span>&nbsp;
                              Lưu thay đổi
                            </button>
                          </span>

                        </div>
                      </form>

                    </li>
                    {/* } */}
                    <li onClick={handleLogout}>
                      <a><i className="ace-icon fa fa-power-off" />Đăng xuất</a>
                    </li>

                  </ul>
                </li>
              </ul>
            </div>
          </>

        ) : (
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            <ul className="nav ace-nav">
              <li className="light-blue dropdown-modal">
                <Link data-toggle="dropdown" to="/login" className="dropdown-toggle">
                  <span className="user-info">Đăng nhập</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
}

export default withRouter(Header);