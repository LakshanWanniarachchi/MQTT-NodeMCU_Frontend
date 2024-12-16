"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { value: 12, date: "2024-12-12" },
  { value: 56, date: "2024-12-12" },
  { value: 34, date: "2024-12-13" },
  { value: 78, date: "2024-12-14" },
  { value: 43, date: "2024-12-15" },
];

const renderLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default renderLineChart;
