// frontend/src/components/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Menubar from "../common/Menubar";
import { getUsers, getProfile, getProfiles } from '../users/UserActions';
import { getCalendar } from "../calendar/CalendarActions";
import CalendarToday from './CalendarToday';
import moment from 'moment'
import UpdateProfile from './UpdateProfile'
import Modal from '@material-ui/core/Modal';

import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { makeStyles } from '@material-ui/core/styles';

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

function Dashboard() {
  const classes = useStyles();
  const profile = useSelector(state => state.profile.data);
  const profiles = useSelector(state => state.profiles.data);
  const data = useSelector((state) => state.calendars.calendars);
  const { user } = useSelector((state) => state.auth);
  const [stateEdit, setStateEdit] = useState(false)

  data.sort((a, b) => {
    if (a.StartTime < b.StartTime) {
      return -1;
    }
    if (a.StartTime > b.StartTime) {
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

  const eventType = (EventType) => {
    switch (EventType) {
      case 0:
        return "Cao"
      case 1:
        return "Trung bình"
      case 2:
        return "Thấp"
      default:
        break;
    }
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(user.id))
  }, [stateEdit])

  useEffect(() => {
    setTimeout(() => {
      if (profile.phone === "" || profile.first_name === null || profile.first_name === "" || profile.last_name === null) {
        setStateEdit(true)
      }
    }, 2000);
  }, [profile])


  useEffect(() => {
    dispatch(getCalendar())
    dispatch(getUsers())
    dispatch(getProfiles())


  }, [])


  const handleSetStateEdit = () => {
    setStateEdit(true)
  }

  const handleClose = () => {
    setStateEdit(false)
  }

  const today = new Date()
  const lengthCal = []
  const lengthCalNext = []

  const CalendarTodays = data.filter(x => moment(x.StartTime).format("DD-MM-YY").toString() <= moment(today).format("DD-MM-YY").toString() && moment(x.EndTime).format("DD-MM-YY").toString() >= moment(today).format("DD-MM-YY").toString()).map((cal, index) => {
    if (cal.User_room.find((uR) => uR === profile.user)) {
      lengthCal.push(cal.id)
      return (
        <CalendarToday key={index} cal={cal} profiles={profiles} profile={profile} />
      )
    }
  })

  const CalendarNexts = data.filter(x => moment(x.StartTime).format("DD-MM-YY").toString() > moment(today).format("DD-MM-YY").toString()).map((cal, index) => {
    if (cal.User_room.find((uR) => uR === profile.user)) {
      lengthCalNext.push(cal.id)
      return (
        <div className="col-xs-12 col-sm-6" style={{ paddingLeft: "0px", paddingRight: "0px" }} key={index}>
          <div className="row"  >
            <div className="col-xs-12 col-sm-4" >
              <div className="text-center">
                <img style={{ maxWidth: '120%' }} className="thumbnail inline no-margin-bottom" alt="Anh Hoi nghi" src="assets\images\meet\meeting.jpg" />
                <div className="hr hr-dotted hr-6"></div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8" >
              <div className="profile-user-info profile-user-info-striped" style={{ display: 'block' }}>
                <div className="profile-info-row" style={{ display: 'block' }}>
                  <div className="profile-info-value" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }} title={cal.Subject}>
                    <i className="ace-icon fa fa-laptop bigger-110"></i> &nbsp;
                    <b>{cal.Subject}</b>
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-value" style={{ color: "green" }}>
                    <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                    Bắt đầu:	{moment(cal.StartTime).format("hh:mm A - DD/MM/YYYY").toString()}
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-value" style={{ color: "grey" }} >
                    <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                    Kết thúc:	{moment(cal.EndTime).format("hh:mm A - DD/MM/YYYY").toString()}
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-value" style={{ color: "grey" }} >
                    <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp;
                    Chủ trì: {profiles.filter(p => cal.User_vip.includes(p.user)).map(v => { return <span style={{ color: "blue" }}>{v.first_name}&nbsp; </span> })}
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-value"  >
                    <i className="ace-icon fa fa-heart-o bigger-110"></i> &nbsp;
                    Mức độ ưu tiên:	{eventType(cal.EventType)}
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-value"  >
                    <i className="ace-icon fa fa-eye bigger-110"></i> &nbsp;
                    Số thành viên: &nbsp;
                    {(() => {
                      switch (String(cal.User_room.length).length) {
                        case 1: return <span>0{cal.User_room.length}</span>;
                        default: return <span>{cal.User_room.length}</span>;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hr hr-dotted hr-6"></div>
        </div>
      )
    }
  })

  return (
    <>
      <Header />
      <div className="main-container ace-save-state" id="main-container">
        <Menubar />
        <div className="main-content">
          <div className="main-content-inner" >
            <div className="row" >

              <div className="row search-page" >
                <div className="col-xs-12 col-sm-8" >
                  <div className="widget-box">
                    <div className="widget-header">
                      <h4 className="widget-title">
                        <i className="ace-icon fa fa-tint" />
                        Danh sách lịch hội nghị
                      </h4>
                    </div>
                    <div className="widget-body" >
                      <div style={{ backgroundColor: "#EFF3F8", fontSize: "14px", textAlign: "center", height: "30px", marginTop: "6px", fontWeight: "bold" }}><b>Các cuộc họp trong ngày</b></div>
                      <div className="widget-main" style={{ paddingRight: "0px", paddingLeft: "0px" }} style={{ flex: 1, height: '40vh', overflowY: 'auto' }}>
                        {lengthCal.length > 0 ?
                          <div className="row">
                            {CalendarTodays}
                          </div>
                          :
                          <div className="row">
                            <b style={{ color: "red" }}>Không có lịch họp trong ngày</b>
                          </div>
                        }
                      </div>
                      <div style={{ backgroundColor: "#EFF3F8", fontSize: "14px", textAlign: "center", height: "30px", marginTop: "6px" }}><b>Các cuộc họp trong những ngày tới</b></div>
                      <div className="widget-main" style={{ paddingRight: "0px", paddingLeft: "0px" }} style={{ flex: 1, height: '35vh', overflowY: 'auto' }}>
                        {lengthCalNext.length > 0 ?
                          <div className="row">
                            {CalendarNexts}
                          </div>
                          :
                          <div className="row">
                            <b style={{ color: "red" }}>Chưa có lịch họp trong thời gian tới</b>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4" style={{ textAlign: "center" }}>
                  <div className="widget-box" style={{ marginTop: "0px" }}>
                    <div className="widget-header">
                      <h4 className="widget-title">
                        Hôm nay ngày {moment().format("DD-MM-YYYY")}
                      </h4>
                    </div>
                    <div className="widget-body">
                      <div className="widget-main" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                        <div className="row" >
                          <div className="col-xs-12 col-sm-6" >
                            <div className="infobox infobox-blue">
                              <div className="infobox-icon">
                                <i className="ace-icon fa  fa-laptop" />
                              </div>
                              <div className="infobox-data">
                                <span className="infobox-data-number">
                                  {(() => {
                                    switch (String(lengthCal.length).length) {
                                      case 1: return <span>0{lengthCal.length}</span>;
                                      default: return <span>{lengthCal.length}</span>;
                                    }
                                  })()}
                                </span>
                                <div className="infobox-content">Cuộc họp trong ngày</div>
                              </div>
                            </div>
                            <div className="infobox infobox-green">
                              <div className="infobox-icon">
                                <i className="ace-icon fa fa-calendar" />
                              </div>
                              <div className="infobox-data">
                                <span className="infobox-data-number">
                                  {(() => {
                                    switch (String(lengthCalNext.length).length) {
                                      case 1: return <span>0{lengthCalNext?.length}</span>;
                                      default: return <span>{lengthCalNext?.length}</span>;
                                    }
                                  })()}
                                </span>
                                <div className="infobox-content">Cuộc họp thời gian tới</div>
                              </div>
                            </div>

                          </div>
                          <div className="col-xs-12 col-sm-6" style={{ display: 'flex', justifyContent: "center" }}>
                            <Clock
                              value={value}
                              size={130}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-box">
                    <div className="widget-header">
                      <h4 className="widget-title">
                        Thông tin tài khoản
                      </h4>
                    </div>
                    <div className="widget-body" style={{ flex: 1, maxHeight: '52vh', overflowY: 'auto' }}>
                      <div className="widget-main">
                        <div className="col-xs-12 col-sm-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                          <div className="row"  >
                            <div className="col-xs-12 col-sm-4" >
                              <div className="text-center">
                                {profile.image &&
                                  <img style={{ maxWidth: '125px' }} className="thumbnail inline no-margin-bottom" alt="Anh dai dien" src={`http://localhost:8000${(profile.image).replace("http://127.0.0.1:8000", "")}`} />
                                }
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-8" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                              <div className="profile-user-info profile-user-info-striped " >

                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value" style={{ color: "green" }}>
                                    <i className="ace-icon fa fa-user bigger-110"></i> &nbsp;
                                    {profile?.first_name}
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value" >
                                    <i className="ace-icon fa fa-eye bigger-110"></i> &nbsp;
                                    {profile?.last_name}
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value"  >
                                    <i className="ace-icon fa fa-envelope-o bigger-110"></i> &nbsp;
                                    {user?.email}
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value"  >
                                    <i className="ace-icon fa fa-phone bigger-110"></i> &nbsp;
                                    {profile?.phone}
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value"  >
                                    <i className="ace-icon fa fa-cogs bigger-110"></i> &nbsp;
                                    {(() => {
                                      switch (String(profile?.groups)) {
                                        case '1': return <span>Quản trị hệ thống</span>;
                                        case '2': return <span>Chủ trì phòng họp</span>;
                                        case '3': return <span>Thành viên</span>;
                                        default: return <span>Thành viên</span>;
                                      }
                                    })()}
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value"  >
                                    <i className="ace-icon fa fa-clock-o bigger-110"></i> &nbsp; Login mới nhất:&nbsp;
                                    {moment(profile?.last_login).format("DD/MM/YYYY").toString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hr hr-dotted hr-6"></div>
                          <div className="width-100 ">
                            <button className=" btn-primary " title="Chỉnh sửa thông tin tài khoản"
                              onClick={handleSetStateEdit}
                            >
                              <i className="ace-icon fa fa-pencil-square-o"></i>
                              &nbsp; Chỉnh sửa&nbsp;
                            </button>

                          </div>
                          <div className="hr hr-dotted hr-6"></div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="widget-box">
                    <div className="widget-header">
                      <h4 className="widget-title">
                        Giới thiệu
                      </h4>
                    </div>
                    <div className="widget-body" style={{ flex: 1, maxHeight: '52vh', overflowY: 'auto' }}>
                      <div className="widget-main">
                        <div className="col-xs-12 col-sm-12" style={{ paddingLeft: "0px", paddingRight: "0px", textAlign: "left" }}>
                          <div className="row"  >
                            <div className="col-xs-12 col-sm-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                              <div className="profile-user-info profile-user-info-striped " >

                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value" style={{ color: "green" }}>
                                    <i className="ace-icon fa fa-th bigger-110"></i> &nbsp;
                                    Hệ thống hội nghị truyền hình ứng dụng được Ban Công nghệ thông tin Quân khu 7 phát triển dựa trên nền tảng mã nguồn mỡ.
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value" >
                                    <i className="ace-icon fa fa-cogs bigger-110"></i> &nbsp;
                                    Có dầy đử các tính năng quản trị, lập lịch họp cho nhiều cuộc Hội nghị đồng thời.
                                    Người điều hành hoặc quản trị có thể điều khiển cuộc họp thông qua giao diện điều khiển.
                                  </div>
                                </div>
                                <div className="profile-info-row" style={{ display: 'block' }}>
                                  <div className="profile-info-value" >
                                    <i className="ace-icon fa fa-phone bigger-110"></i> &nbsp;
                                    Thông tin hỗ trợ: Email: hieunk_qk7@mail.bqp - SĐT: 0982.252.254
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="hr hr-dotted hr-6"></div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={stateEdit}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <UpdateProfile profile={profile} setStateEdit={setStateEdit} />
        </Modal>

        <Footer />
      </div>
    </>
  );
}
export default withRouter(Dashboard);