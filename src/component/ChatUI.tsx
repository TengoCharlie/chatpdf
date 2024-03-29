import React from 'react'
import HeaderComponent from './Header.component'
import ConversationAreaComponent from './ConversationalArea.Component'
import ChatAreaComponent from './ChatArea.component'
import DetailAreaComponent from './DetailedArea.component'

export default function ChatUI() {
    return <>
        <div className="app">
            <HeaderComponent />
            <div className="wrapper">
                <ConversationAreaComponent />
                <ChatAreaComponent />
                <DetailAreaComponent />
            </div>
        </div></>
}
