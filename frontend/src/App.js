import React from 'react';
import Root from "./Root";
import { Route, Switch } from 'react-router-dom';
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login"
import requireAuth from "./utils/RequireAuth";
import Dashboard from "./components/dashboard/Dashboard"
import { ToastContainer } from "react-toastify";
import JitsiMeetAdmin from "./components/jitsi/JitsiMeetAdmin";
import JitsiMeetClient from "./components/jitsi/JitsiMeetClient";
import axios from "axios";
import CalendarAddRoom from './components/calendar/CalendarAddRoom';
import CalendarEditRoom from './components/calendar/CalendarEditRoom';
import CalendarMeet from './components/calendar/CalendarMeet';
import UserCreate from './components/users/UserCreate';

// axios.defaults.baseURL = "http://127.0.0.1:8000";
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

const App = () => {
  return (
    <>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Root>
              {/* PAGE CONTENT BEGINS */}
              <Switch>
                <Route path='/signup' component={requireAuth(Signup)} />
                <Route path='/login' component={Login} />
                <Route path='/user-create' component={UserCreate} />
                <Route exact path="/" component={requireAuth(Dashboard)} />
                <Route path="/hnth-admin/:roomId" component={requireAuth(JitsiMeetAdmin)} />
                <Route path="/hnth-client/:roomId" component={requireAuth(JitsiMeetClient)} />
                <Route path="/cal_meet" component={requireAuth(CalendarMeet)} />
                <Route path="/cal_add" component={requireAuth(CalendarAddRoom)} />
                <Route path="/cal_edit/:Id" component={requireAuth(CalendarEditRoom)} />
                <Route path="*">Link not found!</Route>
              </Switch>
              {/* PAGE CONTENT ENDS */}
      </Root>
      <ToastContainer />
    </>
  )
}
export default App;
