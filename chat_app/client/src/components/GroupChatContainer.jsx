import React from 'react'
import GroupChatHeader from './GroupChatHeader'
import MessageInput from './MessageInput'


export default function GroupChatContainer() {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
        <GroupChatHeader/>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

        </div>
        <MessageInput/>
    </div>
  )
}
