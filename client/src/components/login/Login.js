// frontend/src/components/login/Login.js
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";  // new import 
import { useDispatch } from "react-redux";          // new import 
import { login } from "./LoginActions.js";      // new import 

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const onLoginClick = () => {
    const userData = {
      username,
      password,
    };
    dispatch(login(userData, "/")); // <--- login request
  };
  return (
    <div className="row login-layout blur-login" style={{ height: '100vh' }}>
      <div className="col-sm-10 col-sm-offset-1">
        <div className="login-container" style={{ paddingTop: "18%" }}>
          <div className="center">
            <h1>
              {/* <i className="ace-icon fa fa-leaf green" /> */}
              <span className="red">ĐĂNG NHẬP</span>
            </h1>
          </div>
          <div className="space-6" />
          <div className="position-relative">
            <div id="login-box" className="login-box visible widget-box no-border">
              <div className="widget-body">
                <div className="widget-main">
                  <h4 className="header blue lighter bigger">
                    <i className="ace-icon fa fa-coffee green" />
                    &nbsp; ĐĂNG NHẬP HỆ THỐNG
                  </h4>
                  <div className="space-6" />
                  <form>
                    <fieldset>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="text" className="form-control" placeholder="Username"
                            type="text"
                            name="username"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                          />
                          <i className="ace-icon fa fa-user" />
                        </span>
                      </label>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="password" className="form-control" placeholder="Password"
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                          <i className="ace-icon fa fa-lock" />
                        </span>
                      </label>
                      <div className="space" />
                      <div className="clearfix">
                        <button type="button" className="width-40 pull-right btn-primary"
                          onClick={onLoginClick}
                        >
                          <i className="ace-icon fa fa-key" />
                          <span className="bigger-110">&nbsp;Đăng nhập</span>
                        </button>
                      </div>
                      <div className="space-4" />
                    </fieldset>
                  </form>
                  <div className="social-or-login center">
                    <span className="bigger-110">Thông tin liên hệ</span>
                  </div>
                  <div className="space-6" />
                  <div className="social-login center">
                    <span className="bigger-110">Ban Công nghệ thông tin Quân khu 7</span>
                  </div>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.login-box */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Login);