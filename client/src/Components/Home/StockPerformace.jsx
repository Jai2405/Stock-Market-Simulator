import React from "react";
import { Box, Typography, Stack } from "@mui/material";

export default function StockPerformance(props) {
  const bestPerformingStocks = [
    { symbol: "AAPL", performance: "+5.2%" },
    { symbol: "MSFT", performance: "+4.8%" },
    { symbol: "GOOG", performance: "+4.5%" },
  ];

  const worstPerformingStocks = [
    { symbol: "TSLA", performance: "-3.2%" },
    { symbol: "AMZN", performance: "-2.8%" },
    { symbol: "NFLX", performance: "-1.5%" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: '3rem',
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap",
        padding: '1rem',
  
        
      }}
    >
      {/* Best Performing Stocks */}
      <Box
        sx={{
          maxWidth: "70%",
          padding: 2,
          backgroundColor: "#e3f8e5",
          borderRadius: "8px",
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-10px)'
          },
          
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2, fontSize: '1.25rem' }}>
          Best Performing Stocks
        </Typography>
        <Stack spacing={1}>
          {props.bestPerformingStocks.map((stock, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px", // Restrict width for compact display
                margin: "0 auto", // Center the boxes horizontally
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {stock.stock}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {stock.change_percentage >=0 ? '+': ''}{stock.change_percentage.toFixed(1)}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      

      {/* Worst Performing Stocks */}
      <Box
        sx={{
          maxWidth: "70%",
          padding: 2,
          backgroundColor: "#fcebea",
          borderRadius: "8px",
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-10px)'
          },
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2, fontSize: '1.25rem'  }}>
          Worst Performing Stocks
        </Typography>
        <Stack spacing={1}>
          {props.worstPerformingStocks.map((stock, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px", // Restrict width for compact display
                margin: "0 auto", // Center the boxes horizontally
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {stock.stock}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                {stock.change_percentage >=0 ? '+': ''}{stock.change_percentage.toFixed(1)}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};


