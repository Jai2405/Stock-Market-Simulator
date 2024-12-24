import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SPGraph = () => {
  // Mock data for S&P 500
  const data = [
    { month: "Jan", value: 3800 },
    { month: "Feb", value: 3850 },
    { month: "Mar", value: 3900 },
    { month: "Apr", value: 4000 },
    { month: "May", value: 4100 },
    { month: "Jun", value: 4200 },
    { month: "Jul", value: 4300 },
    { month: "Aug", value: 4400 },
    { month: "Sep", value: 4350 },
    { month: "Oct", value: 4300 },
    { month: "Nov", value: 4200 },
    { month: "Dec", value: 4100 }
  ];

  return (
    <div
      className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-md"
      style={{
        width: '60%',         // Restrict to 60% width
        margin: '0 auto',     // Center the container horizontally
        textAlign: 'center',  // Center-align text content
      }}
    >
      {/* Centered Heading */}
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Market Overview
      </h2>

      {/* Responsive Line Chart */}
      <div style={{ width: '100%', height: '300px', margin: '0 auto' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="value"
              name="S&P 500"
              stroke="#0077b6"
              strokeWidth={2}
              dot={{ r: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SPGraph;
