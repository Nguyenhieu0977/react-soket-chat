import React from 'react'
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"
import UserList from './UserList'

function UserCreate() {
    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        {/* <CalendarBreadcrumb /> */}

                        <div className="page-content">
                            <UserList />
                            {/* handleUpdate={handleUpdate} */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default UserCreate
