import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { FileText, Download } from "lucide-react";
import { ImageModal } from "./ImageModal";


// New function to format just the time
const formatTimeOnly = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// New function to format date for divider
const formatDateDivider = (timestamp) => {
  const date = new Date(timestamp);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[date.getDay()];
  const formattedDate = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  return `${day} ${formattedDate}`;
};

export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDownload = (imageUrl, fileName) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download failed:", error));
  };

  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          Object.entries(groupedMessages).map(([date, dateMessages], index) => (
            <React.Fragment key={date}>
              <div className="flex justify-center my-2">
                <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {formatDateDivider(dateMessages[0].createdAt)}
                </span>
              </div>
              {dateMessages.map((message, msgIndex) => (
                <div
                  key={message._id}
                  className={`chat ${
                    message.senderId === authUser._id
                      ? "chat-end"
                      : "chat-start"
                  }`}
                  ref={
                    msgIndex === dateMessages.length - 1 &&
                    index === Object.keys(groupedMessages).length - 1
                      ? messageEndRef
                      : null
                  }
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        src={
                          message.senderId === authUser._id
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {formatTimeOnly(message.createdAt)}
                    </time>
                  </div>
                  <div className="chat-bubble flex flex-col gap-2">
                    {message.image && (
                      <div className="relative group">
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(message.image)}
                        />
                        <button
                          onClick={() =>
                            handleDownload(
                              message.image,
                              `chat-image-${message._id}`
                            )
                          }
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-gray-800 bg-opacity-70 p-1 rounded-full"
                        >
                          <Download size={20} className="text-white" />
                        </button>
                      </div>
                    )}
                    {message.file && (
                      <a
                        href={message.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500 hover:underline"
                      >
                        <FileText size={20} />
                        <span className="truncate max-w-[200px]">
                          {message.file.split("/").pop()}
                        </span>
                      </a>
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages found</p>
        )}
      </div>
      <MessageInput />
      <ImageModal
        imageUrl={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
