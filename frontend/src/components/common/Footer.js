// frontend/src/components/dashboard/Dashboard.js

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Footer extends Component {

  render() {
    return (
      <>
        <div className="footer" style={{ paddingTop: "0px", position: "fixed", minHeight: "45px", bottom: "0", width: "100%", backgroundColor: "#E3E3E3" }}>
          <div className="footer-inner" style={{paddingBottom: "10px"}}>
              <span className="bigger-120">
                <span className="blue bolder">Ban Công nghệ thông tin Quân khu 7 - </span> HỆ THỐNG TRUYỀN HÌNH ỨNG DỤNG © 2020-2021</span>
           
          </div>
        </div>
        <a href="#" id="btn-scroll-up" className="btn-scroll-up btn btn-sm btn-inverse">
          <i className="ace-icon fa fa-angle-double-up icon-only bigger-110" />
        </a>
      </>
    );
  }
}



export default withRouter(Footer);