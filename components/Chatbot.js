"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Markdown from "react-markdown";

export function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const loadingMessages = [
    "Just grooming my thoughts, give me a moment...",
    "Pawsing to think...",
    "Fetching some purr-fect knowledge...",
    "Hold on, sharpening my claws on this topic...",
  ];

  const errorMessages = [
    "Uh-oh, I think I got distracted by a laser pointer. Let's try again!",
    "Oops, I knocked over my water bowl. Let's retry!",
    "Meow-rror! Something went wrong. Please try again.",
    "Hiss-terical error! Let's give it another shot.",
  ];

  const getRandomMessage = (messagesArray) => {
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
  };

  // Load messages from sessionStorage when the component mounts
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      console.log("Loaded messages from sessionStorage:", JSON.parse(storedMessages));
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to sessionStorage whenever they are updated
  useEffect(() => {
    console.log("Saving messages to sessionStorage:", messages);
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    try {
      setIsTyping(true);
      setError(null);
      if (input.trim() === "") return;
      const MessageInput = input.trim();
      setInput("");
      const newMessages = [...messages, { sender: "user", text: MessageInput }];
      setMessages(newMessages);

      const response = await axios.post("/api/chat", {
        message: MessageInput,
        conversation: newMessages, // Include the entire conversation history
      });

      if (response.data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Purr-fessor", text: response.data.dummyMessage },
        ]);
      } else {
        setError(
          response.data.message ||
            getRandomMessage(errorMessages)
        );
      }
    } catch (error) {
      setError(getRandomMessage(errorMessages));
      // console.error("Error sending message:", error);
    } finally {
      setInput("");
      setIsTyping(false);
      scrollToBottom(); // Ensure scroll to bottom after setting isTyping to false
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    sessionStorage.removeItem("chatMessages");
    scrollToBottom(); // Ensure scroll to bottom after clearing chat history
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="relative w-full max-w-2xl bg-purple-900 rounded-lg shadow-md p-6 flex flex-col space-y-4 h-full">
        <div className="header flex justify-between items-center mb-4 sticky top-0 bg-purple-900 z-10">
          <h2 className="text-2xl font-semibold text-center text-white">
            Purr-fessor: AI Cat Teaching Assistant
          </h2>
          <button
            onClick={clearChatHistory}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Clear Chat History
          </button>
        </div>
        <div className="chat-messages flex flex-col space-y-4 overflow-y-auto flex-grow">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg">{error}</div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`p-2 rounded-lg text-justify break-words ${
                  msg.sender === "user"
                    ? "bg-purple-700 text-white self-end ml-10"
                    : "bg-purple-300 text-black self-start mr-10"
                }`}
              >
                <Markdown>{msg.text}</Markdown>
              </div>
              <span
                className={`text-xs mt-1 ${
                  msg.sender === "user"
                    ? "text-right text-purple-400"
                    : "text-left text-purple-600"
                }`}
              >
                {msg.sender === "user" ? "You" : "Purr-fessor"}
              </span>
              {isTyping && index === messages.length - 1 && (
                <div className="p-1 rounded-lg bg-purple-200 text-black self-start">
                  {getRandomMessage(loadingMessages)}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            autoFocus
            readOnly={isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-800 text-white placeholder-purple-400"
            placeholder="Type your message..."
          />
          <button
            disabled={isTyping}
            onClick={sendMessage}
            className="p-2.5 min-w-20 bg-metallic-dark text-white rounded-lg hover:bg-metallic-hover"
          >
            {isTyping ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}