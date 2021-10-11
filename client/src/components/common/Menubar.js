// frontend/src/components/dashboard/Dashboard.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { logout } from "../login/LoginActions";

const Menubar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout())
  }
  return (
    <>
    { user.groups.find(u=>u===1) &&
    <div id="sidebar" className="sidebar responsive  ace-save-state sidebar-fixed compact sidebar-scroll">
      <div className="nav-wrap-up pos-rel">
        <div className="nav-wrap" style={{ maxHeight: "310px" }}>
          <div style={{ position: "relative" }}>
            <ul className="nav nav-list">
              <li >
                <NavLink axact to="/" >
                  <i className="menu-icon fa fa-tachometer bigger-160" />
                  <span className="menu-text"> Trang chủ </span>
                </NavLink>
                <b className="arrow" />
              </li>
              <>
              <li className="hover highlight" >
                <NavLink to="/cal_meet" activeStyle={{color:"white", backgroundColor:"grey"}}>
                  <i className="menu-icon 	fa fa-camera-retro bigger-160" />
                  <span className="menu-text"> Lập Lịch hội nghị </span>
                </NavLink>
                <b className="arrow" />
              </li>
              
              <li >
                <NavLink to="/user-create" activeStyle={{color:"white", backgroundColor:"grey"}}>
                  <i className="menu-icon fa fa-users bigger-160" />
                  <span className="menu-text"> Quản lý Tài khoản</span>
                </NavLink>
                <b className="arrow" />
              </li>
              </>
              <li  onClick={handleLogout}>
              <NavLink to="" >
                  <i className="menu-icon fa fa-sign-out bigger-160" />
                  <span className="menu-text"> Đăng xuất</span>
                <b className="arrow" />
                </NavLink>
              </li>
            </ul>
            <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
              <i id="sidebar-toggle-icon" className="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  </>
  );
}

export default withRouter(Menubar);