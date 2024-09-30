"use client";
import { useState } from "react";
import axios from "axios";

export function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    try {
      setIsTyping(true);
      if (input.trim() === "") return;

      const userMessage = { sender: "user", text: input };
      setMessages([...messages, userMessage]);

      const response = await axios.post("/api/chat", { message: input });
      setInput("");
      const dummyMessage = { sender: "Bot", text: response.data.dummyMessage };

      setMessages([...messages, userMessage, dummyMessage]);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error("Error sending message:", error);
    } finally {
      setInput("");
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-950 p-4">
      <div className="w-full max-w-md bg-purple-900 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Gemini AI Chatbot
        </h2>
        <div className="flex flex-col space-y-4 mb-4">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg">{error}</div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-purple-700 text-white self-end"
                    : "bg-purple-300 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
              <span
                className={`text-xs mt-1 ${
                  msg.sender === "user"
                    ? "text-right text-purple-400"
                    : "text-left text-purple-600"
                }`}
              >
                {msg.sender === "user" ? "You" : "Bot"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
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
            className="p-2 bg-metallic-dark text-white rounded-lg hover:bg-metallic-hover"
          >
            {isTyping ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
