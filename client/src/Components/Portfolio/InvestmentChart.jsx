import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



  function getRandomColor() {
    const hue = 240; // Base hue for blue
    const saturation = 80; // Keep saturation high for vibrant colors
    const lightness = Math.floor(Math.random() * 10) + 70; // Random lightness between 70 and 80
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  

export default function SingleStackedBarChart(props) {
  // Data for the chart
  const data = [
    {
      Apple: 4000,
      Amazon: 3000,
      Tesla: 2000,
      Google: 2780,
    },
  ];

  const data1={};

  props.portfolio.forEach(stock => {
    data1[stock.stock] = stock.quantity * stock.buy_price;
  });

  var finalData1 = [data1];




  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer>
        <BarChart
          data={finalData1}
          layout="vertical" // Makes it a horizontal bar
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />

          {props.portfolio.map((stock) => (
            <Bar
              key={stock.stock}
              dataKey={stock.stock}
              stackId="a"
              fill={getRandomColor()} // Default color if not in colorMap
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


