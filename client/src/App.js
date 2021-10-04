import React from 'react';
import Root from "./Root";
import { Route, Switch } from 'react-router-dom';
// import Home from "./components/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login"

import requireAuth from "./utils/RequireAuth";

import Dashboard from "./components/dashboard/Dashboard"
import { ToastContainer } from "react-toastify";
import JitsiMeet from "./components/jitsi/JitsiMeet";
import JitsiMeetAdmin from "./components/jitsi/JitsiMeetAdmin";
import JitsiMeetClient from "./components/jitsi/JitsiMeetClient";
import axios from "axios";
import ChatRoom from "./components/chat/ChatRoom";
import Calendar from './components/calendar/Calendar';
import CalendarAddRoom from './components/calendar/CalendarAddRoom';
import CalendarEditRoom from './components/calendar/CalendarEditRoom';
import CalendarMeet from './components/calendar/CalendarMeet';
import ChatUi from './components/chat_ui/ChatUi';
import UserCreate from './components/users/UserCreate';

axios.defaults.baseURL = "http://127.0.0.1:8000";

const App = () => {
  return (
    <>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Root>
        {/* <Header /> */}
          {/* <Menubar /> */}
          {/* <div class="main-content">
            <div class="main-content-inner"> */}
              {/* PAGE CONTENT BEGINS */}
              <Switch>
                <Route path='/signup' component={requireAuth(Signup)} />
                <Route path='/login' component={Login} />
                <Route path='/user-create' component={UserCreate} />
                <Route exact path="/" component={requireAuth(Dashboard)} />
                {/* <Route  path="/login" component={Login} /> */}
                {/* <Route path="/cntt" component={requireAuth(ChatRoom)} /> */}
                {/* <Route path="/hnth/:Id" component={requireAuth(JitsiMeet)} /> */}
                <Route path="/hnth-admin/:roomId" component={requireAuth(JitsiMeetAdmin)} />
                <Route path="/hnth-client/:roomId" component={requireAuth(JitsiMeetClient)} />
                <Route path="/calendar" component={requireAuth(Calendar)} />
                <Route path="/cal_meet" component={requireAuth(CalendarMeet)} />
                <Route path="/cal_add" component={requireAuth(CalendarAddRoom)} />
                <Route path="/cal_edit/:Id" component={requireAuth(CalendarEditRoom)} />
                {/* <Route path="/chat" component={requireAuth(ChatUi)} /> */}
                <Route path="*">Link not found!</Route>
              </Switch>
              {/* PAGE CONTENT ENDS */}
            {/* </div>
          </div> */}
        {/* <Footer /> */}
      </Root>
      <ToastContainer />
    </>
  )
}
export default App;
