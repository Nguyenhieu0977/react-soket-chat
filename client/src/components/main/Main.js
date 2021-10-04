import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "../Home";
import Signup from "../signup/Signup";
import EventList from "../event/EventList"

import requireAuth from "../../utils/RequireAuth";

import Dashboard from "../dashboard/Dashboard"
// import Header from "../header/Header"

import Jitsi from "../jitsi/Jitsi";

import axios from "axios";
// import Menubar from '../nenubar/Menubar';

import ChatRoom from "../chat/ChatRoom";


// import Footer from './components/footer/Footer';


import {useFullScreen} from "react-browser-hooks";

axios.defaults.baseURL = "http://127.0.0.1:8000";



// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import "./index.css";
// import Home from "./Home/Home";

class Main extends Component {
  render() {
    return (
      <>
          {/* <Header /> */}
          <div className="main-container ace-save-state" id="main-container">
            {/* <Menubar /> */}
            <div className="main-content">
              <div className="main-content-inner">
                <div className="page-content">

                  <div className="row">
                    <div className="col-xs-12">
                      {/* PAGE CONTENT BEGINS */}
                      <Switch>
                        <Route path='/signup' component={requireAuth(Signup)} />
                        <Route path="/dashboard" component={requireAuth(Dashboard)} />
                        <Route exact path="/" component={Home} />
                        <Route path="/CNTT" component={ChatRoom} />
                        <Route path="/jitsi" component={requireAuth(Jitsi)} />
                        <Route path="/event" component={requireAuth(EventList)} />
                        <Route path="*">Link not found!</Route>
                      </Switch>
                      {/* PAGE CONTENT ENDS */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
      </>
    )
  }
}

export default Main;

