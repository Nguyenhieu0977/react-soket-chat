import React, { useState, useEffect } from "react";
// import "./material.css";
import CalendarList from "./CalendarList";
import CalendarBreadcrumb from "./CalendarBreadcrumb";
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"

function CalendarMeet() {

    // const [Id_cal, setId_cal] = useState()
    // const [itemCalendar, setItemCalendar] = useState()

    // const handleUpdate = (Id, data) => {
    //     setId_cal(Id)
    //     setItemCalendar(data)
    // }
    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* <CalendarBreadcrumb /> */}

                        <div className="page-content">
                            <CalendarList />
                            {/* handleUpdate={handleUpdate} */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default CalendarMeet;