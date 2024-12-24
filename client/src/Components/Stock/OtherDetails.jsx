import React from 'react';
import { Typography, Box, Paper } from "@mui/material";
import { MonetizationOn, TrendingUp, TrendingDown, ShowChart } from "@mui/icons-material";
import "../../pages/Stock.css"



export default function OtherDetails(props) {
  const detailItems = [
    { 
      label: 'Year High', 
      value: `$${props.high.toFixed(2)}` 
    },
    { 
      label: 'Year Low', 
      value: `$${props.low.toFixed(2)}` 
    },
    { 
        label: 'Market Cap', 
        value: `$${(props.marketCap / 1_000_000_000).toFixed(2)}B` 
      },
    { 
      label: 'Volume', 
      value: `${(props.volume / 1_000_000).toFixed(2)}M` 
    }
  ];

  return (
      <div className="other-container">
        {detailItems.map((item, index) => (
          <div className="detail-card" key={index}>
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
  );
}
