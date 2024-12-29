"use client";

import React, { useState, useEffect, useRef } from "react";

function LiveData() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket
    socketRef.current = new WebSocket("ws://65.2.171.194//ws/sensor-data/");

    const socket = socketRef.current;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true); // Update connection status
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [
          ...prev,
          `Topic: ${data.topic}, Data: ${data.data}`,
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log(
        `WebSocket disconnected: Code ${event.code}, Reason: ${event.reason}`
      );
      setIsConnected(false); // Update connection status
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendCommand = () => {
    if (socketRef.current && inputValue.trim() !== "") {
      // prvent sending empty command using trim()
      socketRef.current.send(JSON.stringify({ inputValue }));
      setMessages((prev) => [...prev, `Sent: ${inputValue}`]);
      setInputValue(""); // Clear input field
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#FFFFFF",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Live WebSocket Data</h1>
      {/* Connection status indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundColor: isConnected ? "green" : "red",
            marginRight: "10px",
          }}
        ></div>
        <span>
          {isConnected
            ? "Connected to WebSocket"
            : "Disconnected from WebSocket"}
        </span>
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #444",
          borderRadius: "5px",
          maxHeight: "300px",
          overflowY: "scroll",
          backgroundColor: "#1E1E1E",
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => <p key={index}>{msg}</p>)
        ) : (
          <p>No messages received yet.</p>
        )}
        {/* Dummy element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter command"
          style={{
            width: "calc(100% - 110px)",
            padding: "10px",
            border: "1px solid #444",
            borderRadius: "5px",
            backgroundColor: "#1E1E1E",
            color: "#FFF",
          }}
        />
        <button
          onClick={sendCommand}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default LiveData;
