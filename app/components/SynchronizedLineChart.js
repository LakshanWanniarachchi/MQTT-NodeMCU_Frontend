"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Example = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#121212",
        color: "#FFFFFF",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h4 style={{ color: "#FFFFFF" }}>Real-Time Distance vs Time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#444" />
          <XAxis
            dataKey="timestamp"
            stroke="#FFFFFF"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} // Format timestamp to HH:mm:ss
          />
          <YAxis stroke="#FFFFFF" />
          <Tooltip
            labelFormatter={(label) =>
              `Time: ${new Date(label).toLocaleTimeString()}`
            }
            contentStyle={{
              backgroundColor: "#333",
              border: "none",
              borderRadius: "5px",
              color: "#FFFFFF",
            }}
          />
          <Line
            type="monotone"
            dataKey="distance"
            stroke="#82ca9d"
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket
    socketRef.current = new WebSocket("ws://localhost:8000/ws/sensor-data/");
    const socket = socketRef.current;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const message = event.data; // e.g., "Distance: 15.10 cm"
        const distanceMatch = message.match(/Distance:\s*([\d.]+)\s*cm/);
        if (distanceMatch) {
          const distance = parseFloat(distanceMatch[1]);
          const timestamp = Date.now(); // Current timestamp

          // Update chart data
          setChartData((prevData) => [...prevData, { timestamp, distance }]);
        }
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
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#121212",
        color: "#FFFFFF",
      }}
    >
      <Example data={chartData} />
    </div>
  );
}
