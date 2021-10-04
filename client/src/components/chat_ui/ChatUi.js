import React from 'react'
import './ChatUi.css'
import ChatBody from './chatBody/ChatBody'
import Header from "../common/Header"
import Footer from "../common/Footer"
import Menubar from "../common/Menubar"

function ChatUi() {
    return (
        <>
            <Header />
            <div className="main-container ace-save-state" id="main-container">
                <Menubar />
                <div className="main-content">
                    <div className="main-content-inner" >
                        <div className="page-content">
                            <div className="row">
                                <div className="__main">
                                    <ChatBody />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ChatUi
