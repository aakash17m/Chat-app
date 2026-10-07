import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";
import { useAuthStore } from "../store/UseAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
      <div className="flex-1 flex flex-col overflow-auto">
        {messages.map((message) => (
          <div key={message._id}
            className={`chat ${message.sender._id === authUser._id ? "chat-end": "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">

                </div>
              </div>

          </div>
        ))}
      </div>

      <MessageInput />

    </div>
  )
}

export default ChatContainer