import Image from "next/image";
import React from "react";
import RenderLineChart from "./components/Chart.js";
import LiveData from "./components/LiveData.js";
import Example from "./components/SynchronizedLineChart.js";

export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#121212",
        color: "#FFFFFF",
      }}
    >
      {/* Left Section */}
      <div style={{ borderRight: "1px solid #444", paddingRight: "20px" }}>
        <h1 style={{ color: "#FFFFFF" }}>Welcome to the Line Chart Example</h1>
        <LiveData />
      </div>

      {/* Right Section */}
      <div style={{ paddingLeft: "20px" }}>
        <RenderLineChart />
        <Example />
      </div>
    </div>
  );
}
