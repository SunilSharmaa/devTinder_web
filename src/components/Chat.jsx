import React, { useEffect, useState, useRef, useCallback } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { DEVTINDER_BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [chatUserName, setChatUserName] = useState("");

  const fetchChatMessages = useCallback(async () => {
    if (!targetUserId || !userId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${DEVTINDER_BASE_URL}/chat/${targetUserId}`,
        {
          withCredentials: true,
        },
      );
      const chatMessages =
        response?.data?.messages?.map((msg) => ({
          id: msg._id,
          firstName: msg.senderId?.firstName || "Unknown",
          lastName: msg.senderId?.lastName || "",
          text: msg.text,
          isOwn: msg.senderId._id === userId,
          timestamp: msg.createdAt,
        })) || [];
      setMessages(chatMessages);

      if (response?.data?.messages?.length) {
        const otherUser = response.data.messages.find(
          (msg) => msg.senderId._id !== userId,
        );

        if (otherUser) {
          setChatUserName(otherUser.senderId.firstName);
        }
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  }, [targetUserId, userId]);

  useEffect(() => {
    fetchChatMessages();
  }, [fetchChatMessages, targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("joinChat", { userId, targetUserId });
    });

    socket.on("messageReceived", (message) => {
      setMessages((prev) => {
        // Avoid duplicates if message already exists (e.g., own optimistic message confirmed)
        const exists = prev.some(
          (m) =>
            m.id === message.id || (m.tempId && m.tempId === message.tempId),
        );
        if (exists) return prev;
        return [
          ...prev,
          {
            ...message,
            isOwn: message.senderId === userId,
          },
        ];
      });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Connection failed. Please refresh.");
    });

    return () => {
      socket.off("connect");
      socket.off("messageReceived");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(() => {
    if (
      !inputMessage.trim() ||
      !socketRef.current?.connected ||
      !userId ||
      !targetUserId
    ) {
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const optimisticMessage = {
      id: tempId,
      tempId,
      firstName: user.firstName || "You",
      lastName: user.lastName || "",
      text: inputMessage,
      isOwn: true,
      timestamp: new Date().toISOString(),
    };

    // Optimistic update
    setMessages((prev) => [...prev, optimisticMessage]);

    // Send to server
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: inputMessage,
      tempId,
    });

    setInputMessage("");
  }, [inputMessage, userId, targetUserId, user]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="pt-18 min-h-screen flex items-center justify-center">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="pt-18 min-h-screen ">
      <div className="w-160 mx-auto mt-10 h-120 rounded-2xl flex flex-col shadow-xl bg-gray-600">
        <h1 className="text-center text-xl py-4 font-bold shadow shadow-white rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          { chatUserName || "User"}
        </h1>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mx-4 mb-4">
            {error}
            <button onClick={fetchChatMessages} className="ml-2 underline">
              Retry
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col shadow-inner rounded-xl overflow-hidden mx-4 mt-4 mb-4">
          <div
            ref={messageContainerRef}
            className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-900 to-white"
          >
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 italic py-8">
                No messages yet. Start the conversation!
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id || msg.tempId || index}
                  className={`mb-4 flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${
                      msg.isOwn
                        ? "bg-gray-800 text-white rounded-br-sm"
                        : "bg-gray-500 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">
                      {msg.firstName} {msg.lastName}
                    </div>
                    <div className="text-sm">{msg.text}</div>
                    {msg.timestamp && (
                      <div className="text-xs opacity-75 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-black border-t border-gray-200 flex space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={!socketRef.current?.connected}
            />
            <button
              className="p-3 px-6 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md transition-all"
              onClick={sendMessage}
              disabled={!inputMessage.trim() || !socketRef.current?.connected}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
