import Image from "next/image";
import React from "react";

import LiveData from "./components/LiveData.js";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Line Chart Example</h1>
      <LiveData />
    </div>
  );
}
