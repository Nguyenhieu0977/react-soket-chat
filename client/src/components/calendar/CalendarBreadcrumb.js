import React from 'react'
import {Link} from 'react-router-dom'

const CalendarBreadcrumb = () => {
    return (
        <div id="sidebar2" style={{ paddingTop: "0", textAlign:"center" }} className="sidebar h-sidebar navbar-collapse collapse ace-save-state sidebar-fixed" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">
            <div className="nav-wrap-up pos-rel"><div className="nav-wrap"><ul className="nav nav-list" style={{ top: 0, position: 'relative', transitionProperty: 'top', transitionDuration: '0.15s' }}>
                <li className="hover hover-show hover-shown">
                    <Link to='/calendar'>
                        <i className="menu-icon fa fa-bar-chart-o" />
                        <span className="menu-text"> Tổng quan </span>
                    </Link>
                    <b className="arrow" />
                </li>
                <li className="hover active">
                    <Link to='/cal_meet'>
                        <i className="menu-icon fa  fa-calendar" />
                        <span className="menu-text"> Danh sách phòng họp </span>
                    </Link>
                    <b className="arrow" />
                </li>
                <li className="hover">
                    <Link to='/cal_add'>
                        <i className="menu-icon fa fa-pencil-square-o" />
                        <span className="menu-text">Thêm mới phòng họp</span>
                    </Link>
                    <b className="arrow" />
                </li>
                <li className="hover">
                    <Link to='/jitsi'>
                        <i className="menu-icon fa fa-desktop" />
                        <span className="menu-text">Hội nghị trực tuyến</span>
                    </Link>
                    <b className="arrow" />
                </li>


            </ul></div><div className="ace-scroll nav-scroll scroll-disabled"><div className="scroll-track scroll-hover" style={{ display: 'none' }}><div className="scroll-bar" style={{ transitionProperty: 'top', transitionDuration: '0.1s', top: 0 }} /></div><div className="scroll-content" style={{}}><div /></div></div></div>{/* /.nav-list */}
        </div>

    )
}

export default CalendarBreadcrumb
