"use client";
import React, { useEffect, useRef, useState } from "react";
import { User, Bot } from "lucide-react";

const ChatDiv = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! Ask me anything." },
    { role: "user", text: "Hi! How are you?" },
  ]);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Example of adding a new message (simulate fetching from API)
  const sendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "Tell me a fact." },
      { role: "ai", text: "Did you know? Octopuses have three hearts!" },
    ]);
  };

  return (
    <div className="p-3 h-[88vh] bg-[#0f0f0f] rounded-lg flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <div className="p-2 rounded-full bg-gray-800">
                <Bot size={20} className="text-purple-400" />
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm md:text-base ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="p-2 rounded-full bg-blue-600">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDiv;
