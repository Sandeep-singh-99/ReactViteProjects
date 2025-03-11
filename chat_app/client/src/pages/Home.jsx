import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import GroupChatContainer from "../components/GroupChatContainer"; 
import { ChevronLeft } from "lucide-react";
import { useGroupStore } from "../store/useGroupStore";

export default function Home() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { selectedGroup, setSelectedGroup } = useGroupStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleBack = () => {
    setSelectedUser(null);
    setSelectedGroup(null); 
    setIsSidebarOpen(true);
  };

  const isGroupChat = selectedGroup != null; 
  const isUserChat = selectedUser != null; 

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 lg:px-4 px-2">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-8xl lg:h-[calc(100vh-8rem)] h-[calc(100vh-5rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar: Full width on mobile when no user or group is selected */}
            <div
              className={`${
                isSidebarOpen && !(isUserChat || isGroupChat)
                  ? "w-full"
                  : isUserChat || isGroupChat
                  ? "hidden"
                  : "w-20 lg:w-72"
              } lg:block transition-all duration-200`}
            >
              <SideBar />
            </div>

            {/* Chat Area: Show only when a user or group is selected on mobile */}
            <div
              className={`${
                isUserChat || isGroupChat ? "w-full" : "hidden lg:block"
              } flex-1 flex flex-col`}
            >
              {/* Conditional Back Button */}
              {(isUserChat || isGroupChat) && (
                <button
                  onClick={handleBack}
                  className="lg:hidden p-4 text-left font-medium flex items-center gap-2 bg-base-100 border-b border-base-300"
                >
                  <ChevronLeft size={25} />
                  Back
                </button>
              )}

              {/* Render Chat Container based on user or group selection */}
              {isGroupChat ? (
                <GroupChatContainer />
              ) : isUserChat ? (
                <ChatContainer />
              ) : (
                <div className="flex w-screen h-full justify-center items-center">
                  <NoChatSelected />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
